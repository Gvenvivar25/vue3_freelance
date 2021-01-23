<template>
  <span class="badge"
        :class="[{
          'primary': type === 'active' || 'done',
          'danger': type === 'cancelled',
          'warning': type === 'pending'}]">{{ statusName }}</span>
</template>
<script>
import { computed} from 'vue'
export default {
  props: ['type'],
  setup(props) {
    const statusName = computed(() => {
      switch (props.type) {
        case 'active': return 'Активен'
        case 'cancelled': return 'Отменен'
        case 'pending': return 'Выполняется'
        case 'done': return 'Завершен'
      }
    })

    return {
      statusName
    }
  }
}

</script>