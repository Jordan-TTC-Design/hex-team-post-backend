const OrderService = require('../service/order.service');
module.exports = {
	created: async (req, res, next) => {
		/* #swagger.parameters['obj'] = {
				in: 'body',
				description: '資料格式',
				schema:{
						$productId:'ObjectId',
				}
		}*/
		/* #swagger.responses[201] = {
				schema:{
						status: 'success',
						data: {
								id:'Order Id'
						}
				},
		} 
		*/
		/* #swagger.responses[400] = {
				schema:{
						status: 'error',
						message: '錯誤訊息'
				},
		} 
		*/
		if (!req.body.productId) {
			return res.status(400).send({
				status: 'error',
				message: '請輸入產品編號',
			});
		}
		const order = await OrderService.created(req.body.productId, req.user);
		if (!order) {
			return res.status(400).send({
				status: 'error',
				message: '產生訂單失敗',
			});
		}
		return res.status(201).send({
			status: 'success',
			data: {
				orderId: order._id,
			},
		});
	},
	getStatus: async (req, res, next) => {
		/* #swagger.parameters['orderId'] = {
				description: '資料格式',
				schema:String
		}*/
		if (!req.query.orderId) {
			return res.status(400).send({
				status: 'error',
				message: '請輸入訂單編號',
			});
		}
		const order = await OrderService.getStatus(req.query.orderId);

		if (!order) {
			return res.status(400).send({
				status: 'error',
				message: '查無訂單',
			});
		}
		if (!order.payment) {
			return res.status(200).send({
				status: 'success',
				data: {
					paymentStatus: false,
					message: '未付款',
				},
			});
		}
		/* #swagger.responses[200] = {
				schema:{
						status: 'success',
						data: {
							status:true,
							message:'授權成功'
						}
				},
		} 
		*/
		return res.status(200).send({
			status: 'success',
			data: {
				status: order.payment.status,
				message: order.payment.message,
			},
		});
	},
};