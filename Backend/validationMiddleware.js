const validateRequestBody = (req, res, next) => {
    const { title, description,category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Title , description and category are required' });
    }
    next();
  };
  
  const validateQueryParams = (req, res, next) => {
    const { category } = req.query;
    if (['personal', 'work', 'shopping'].includes(category))
      
      {
        next();
    }
    return res.status(400).json({ error: 'Invalid category parameter' });
  };
  
  module.exports = { validateRequestBody, validateQueryParams };
  