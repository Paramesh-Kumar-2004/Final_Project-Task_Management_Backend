class APIFeatures {
    constructor(pipeline, queryString) {
        this.pipeline = pipeline;
        this.queryString = queryString;
    }

    search(fields = []) {
        if (this.queryString.search && fields.length) {
            this.pipeline.unshift({
                $match: {
                    $or: fields.map(field => ({
                        [field]: {
                            $regex: this.queryString.search,
                            $options: "i"
                        }
                    }))
                }
            });
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.queryString };
        ["search", "page", "limit"].forEach(el => delete queryObj[el]);

        if (Object.keys(queryObj).length) {
            this.pipeline.unshift({
                $match: queryObj
            });
        }
        return this;
    }

    paginate(defaultLimit = 5) {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || defaultLimit;
        const skip = (page - 1) * limit;

        this.pipeline.push(
            { $skip: skip },
            { $limit: limit }
        );

        return this;
    }
}


export default APIFeatures;