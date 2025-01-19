import Brand from "../models/Brand.js";
import Product from "../models/Product.js";

// Track product search in the database
const trackProductSearch = async (productId) => {
  try {
    await Product.findByIdAndUpdate(productId, {
      $inc: { searchCount: 1 },
      $set: { lastSearched: new Date() },
    });
  } catch (error) {
    console.error(`Error tracking search for product ${productId}:`, error);
  }
};


export const searchProducts = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        status: "error",
        message: "Search query is required",
      });
    }

    // Use regex to support partial matching
    const searchFilter = {
      $or: [
        { productName: { $regex: query, $options: "i" } }, // Case-insensitive partial match
        { productDetail: { $regex: query, $options: "i" } },
      ],
    };

    // Pagination calculation
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch matching products with pagination and population
    const products = await Product.find(searchFilter)
      .populate("brand", "name")
      .populate("parentCategory", "cName cDescription")
      .populate("subCategory", "cName cDescription")
      .populate("childCategory", "cName cDescription")
      .skip(skip)
      .limit(parseInt(limit))
      .select("productName productPrice productImage productDetail searchCount lastSearched");

    if (!products.length) {
      return res.status(404).json({
        status: "error",
        message: "No products found for the given query",
      });
    }

    // Track searches in parallel
    await Promise.all(
      products.map((product) =>
        trackProductSearch(product._id)
      )
    );

    return res.status(200).json({
      status: "success",
      message: "Products retrieved successfully",
      page: parseInt(page),
      limit: parseInt(limit),
      total: products.length,
      products,
    });
  } catch (error) {
    console.error("Error in searchProducts:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};



export const filterByBrand = async (req, res) => {
  try {
    const { brand } = req.query;

    if (!brand) {
      return res.status(400).json({
        status: "error",
        message: "Brand name is required",
      });
    }

    const brandObj = await Brand.findOne({ name: { $regex: brand, $options: 'i' } });
    if (!brandObj) {
      return res.status(404).json({
        status: "error",
        message: "Brand not found",
      });
    }

    const products = await Product.find({ brand: brandObj._id });

    return res.status(200).json({
      status: "success",
      message: "Products filtered by brand",
      products,
    });
  } catch (error) {
    console.error("Error in filterByBrand:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

export const getSortedProducts = async (req, res) => {
  try {
    const { sort, category } = req.query;

    // Check if category is provided
    if (!category) {
      return res.status(400).json({
        status: "error",
        message: "Category is required for sorting.",
      });
    }

    if (!sort || (sort !== "low-to-high" && sort !== "high-to-low")) {
      return res.status(400).json({
        status: "error",
        message: "Invalid sort parameter. Use 'low-to-high' or 'high-to-low'.",
      });
    }

    const sortOrder = sort === "low-to-high" ? 1 : -1;

    const filter = { category }; // Ensure category is always included in the filter

    const products = await Product.find(filter)
    .populate("parentCategory", "cName cDescription")
    .populate("subCategory", "cName cDescription")
    .populate("childCategory", "cName cDescription")
      .sort({ productPrice: sortOrder });

    if (!products.length) {
      return res.status(404).json({
        status: "error",
        message: "No products found in the specified category.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Products sorted by price ${sort.replace("-", " ")}`,
      products,
    });
  } catch (error) {
    console.error("Error sorting products:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server Error",
    });
  }
};

export const filteredPriceProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, category } = req.query;

    // Check if category is provided
    if (!category) {
      return res.status(400).json({
        status: "error",
        message: "Category is required for filtering.",
      });
    }

    const filter = { category }; // Ensure category is always included in the filter
    if (minPrice) filter.productPrice = { $gte: Number(minPrice) };
    if (maxPrice) filter.productPrice = { ...filter.productPrice, $lte: Number(maxPrice) };

    const products = await Product.find(filter)
    .populate("parentCategory", "cName cDescription")
    .populate("subCategory", "cName cDescription")
    .populate("childCategory", "cName cDescription")
      .sort({ productPrice: 1 }); // Optional: default sorting by price

    if (!products.length) {
      return res.status(404).json({
        status: "error",
        message: "No products found in the specified category and price range.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Products filtered successfully.",
      products,
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server Error",
    });
  }
};

export const getProductSuggestions = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({
        status: 'error',
        message: 'Query must be at least 2 characters long'
      });
    }

    const suggestions = await Product.aggregate([
      {
        $match: {
          $or: [
            { productName: { $regex: query, $options: 'i' } },
            { brand: { $regex: query, $options: 'i' } }
          ]
        }
      },
      {
        $project: {
          _id: 1,
          productName: 1,
          brand: 1,
          productPrice: 1,
          productImage: 1
        }
      },
      { $limit: 5 }
    ]);

    return res.status(200).json({
      status: 'success',
      suggestions
    });
  } catch (error) {
    console.error('Error fetching product suggestions:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Server Error'
    });
  }
};

export const getMostSearchedProducts = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const mostSearched = await Product.find({ searchCount: { $gt: 0 } })
      .sort({ searchCount: -1, lastSearched: -1 })
      .limit(parseInt(limit))
      .populate("brand", "name")
      .populate("parentCategory", "cName")
      .select("productName productPrice productImage productDetail brand parentCategory searchCount lastSearched");

    res.status(200).json({
      success: true,
      count: mostSearched.length,
      data: mostSearched,
    });
  } catch (error) {
    console.error("Error getting most searched products:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving most searched products",
    });
  }
};