function getDataFromDatabase(){
              return new Promise((resolve, reject)=>{
                 try {
                     // if Promise resolves, return data from the resolve method
                     resolve()
                 } catch (error) {
                     // if the promise rejects, return error data from the reject method
                     reject(console.log(error.message))
                 }
              })
          }
          getDataFromDatabase().then((data)=>{
              // data is the returned value from the getFromDatabase function
              console.log(data)
          })