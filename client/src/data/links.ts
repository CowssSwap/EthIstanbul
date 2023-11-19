const domain = () => {
    if (process.env.NODE_ENV == "production") return "something";
    return "http://localhost:5001";
  };
  
  const links = {
  
    post_store_dborder: `${domain()}/public/store`,
    
  };
  
  export default links;
  