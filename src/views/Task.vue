<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{  task.date }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="changeStatus({status: 'pending', id: $route.params.id})">Взять в работу</button>
      <button class="btn primary" @click="changeStatus({status: 'done', id: $route.params.id})">Завершить</button>
      <button class="btn danger" @click="changeStatus({status: 'cancelled', id: $route.params.id})">Отменить</button>
      <button class="btn" @click="changeStatus({status: 'active', id: $route.params.id})">Сделать активной</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ $route.params.id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from 'vuex'
import { computed} from 'vue'

export default {
  props: ['id'],
  components: {AppStatus},
  setup(props) {
    const store = useStore()
    const tasks = computed( () => {
      return store.state.tasks
    })
    const task = tasks.value.find( item => item.id === props.id)

    function changeStatus(data) {
      store.dispatch('fetchStatus', {
        status: data.status,
        id: data.id
      })
    }
    return {
      task,
      changeStatus
    }
  }
}
</script>

<style scoped>

</style>