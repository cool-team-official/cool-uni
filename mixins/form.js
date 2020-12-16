import { getParent } from '../utils'

export default {
    computed: {
        $form() {
            return getParent.call(this, "ClForm", [
                "labelWidth",
                "labelPosition",
                "showMessage",
                "model",
                "addField",
                "removeField",
                "validateOnValueChange",
                "rules2",
                "disabled"
            ]);
        },

        isDisabled() {
            return this.$form ? (this.$form.disabled || this.disabled) : this.disabled
        }
    }
}