function validate(schema) {
    return async function (req, res, next) {
        try {
            console.log('validation round');
            const validationResult = await schema.validateAsync(req.body);
            next();
        } catch (error) {
            res.json({ message: error.details });
        }
    }
}

export default validate;