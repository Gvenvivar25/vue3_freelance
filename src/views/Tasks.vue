<template>
  <h1 class="text-white center" v-if="!tasks">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ statusCounter }}</h3>

      <div class="card" v-for="task in tasks" :key="task.id">
        <h2 class="card-title">
          {{ task.title }}
          <AppStatus :type="task.status" />
        </h2>
        <p>
          <strong>
            <small>
              {{task.date}}
            </small>
          </strong>
        </p>
        <router-link :to="{name: 'task', params: {id: task.id} }" >
          <button class="btn primary">Посмотреть</button>
        </router-link>

      </div>

  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { computed, onMounted} from 'vue'
import {useStore} from 'vuex'

export default {
  setup() {
    const store = useStore()
    const tasks = computed( () => {
      return store.state.tasks
    })
    onMounted(store.dispatch('fetchTasks'))

    const statusCounter = computed( () => {
      return store.getters.statusCounter
    })

    return {
      tasks,
      statusCounter
    }
  },
  components: {AppStatus},
}
</script>
