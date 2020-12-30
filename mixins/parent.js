import { getParent, isEmpty } from '../utils'

export default {
    data() {
        return {
            Parent: null,
        }
    },

    computed: {
        parent() {
            return this.getParent() || this.Parent || {};
        },

        hasParent() {
            return !isEmpty(this.parent)
        }
    },

    mounted() {
        this.Parent = this.getParent()
    },

    methods: {
        getParent() {
            if (!this.ComponentName) {
                return null
            }

            return getParent.call(this, this.ComponentName, this.Keys)
        }
    }
}