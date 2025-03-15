import Elysia from "elysia";

export const hookSetup = new Elysia()
    .onError(({code,set})=>{
        if (code === 'NOT_FOUND') {
            set.status = 404
            return {
              message: 'Page Not Found!',
              status: 404
            };
    
          } else {
    
            // response status will be current status or 500
            set.status ||= 500;
    
            if (set.status === 400) {
              return {
                message: 'Unable to process the data!',
                status: 400
              };
            }
            return 'Service unavailable. Please come back later.'
          }
    })