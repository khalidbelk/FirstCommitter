<template>
  <Toast
    :position="position"
    :group="group"
    :severity="severity"
    :summary="summary"
    :detail="detail"
  />
</template>

<script lang="ts">
import { toRefs, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import 'primevue/resources/themes/aura-light-green/theme.css'

export default {
  props: {
    position: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      default: 'info'
    }
  },
  setup(props) {
    const toast = useToast()

    const { position, group, severity } = toRefs(props)
    const summary = ref('')
    const detail = ref('')

    props.severity === 'success'
      ? ((summary.value = 'Success'),
        (detail.value = 'First commit found succesfully !'))
      : null
    props.severity === 'warn'
      ? ((summary.value = 'Warning'),
        (detail.value =
          "The server can't handle this request, maybe you made too many requests. Try later ! (403)"))
      : null
    props.severity === 'error'
      ? ((summary.value = 'Error'),
        (detail.value =
          "The repository couldn't be found. Please verify the URL and try again. (404)"))
      : null
    props.severity === 'secondary'
      ? ((summary.value = 'Unexpected'),
        (detail.value = 'Something unexpected happened'))
      : null

    return {
      showToast() {
        toast.add({
          position: position.value,
          group: group.value,
          severity: severity.value,
          summary: summary.value,
          detail: detail.value,
          life: 3000
        })
      }
    }
  },
  mounted() {
    this.showToast()
  }
}
</script>
