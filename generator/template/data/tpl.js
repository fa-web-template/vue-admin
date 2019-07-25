import rules from "../rules"
export default {
    common: {
        item: [
            {
                label: "编号",
                key: "id",
                type: "text",
                rules: [...rules.required({ label: "编号" })]
            },
            {
                label: "名称",
                key: "name",
                type: "text",

                rules: [...rules.required({ label: "名称" })]
            }
        ],
        data: () => ({
            id: "",
            name: ""
        })
    },

    search: {
        item: [
            {
                label: "编号",
                key: "id",
                type: "text",
                meta: {
                    operation: "like"
                }
            },
            {
                label: "名称",
                key: "name",
                type: "text",
                meta: {
                    operation: "like"
                }
            }
        ],
        data: () => ({
            id: "",
            name: ""
        })
    }
}
