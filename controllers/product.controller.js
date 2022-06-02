const ProductService = require('../service/product.service');
module.exports = {
	getAll: async (req, res, next) => {
		const { query } = req;
		/* #swagger.responses[200] = {
     		schema: { $ref: '#/definitions/Product' }
    } 
    */
		const products = await ProductService.getAll(query.type);
		res.status(200).json({
			status: 'success',
			data: products,
		});
	},
};
