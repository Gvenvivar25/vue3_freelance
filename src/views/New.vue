<template>
  <form class="card" @submit.prevent="submitForm">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>
    <button class="btn primary" type="submit" :disabled="!isValid">Создать</button>
  </form>
</template>

<script>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import {useStore} from 'vuex'
export default {

  setup() {
    const store = useStore()
    const router = useRouter()

    const title = ref('')
    const date = ref(new Date())
    const description = ref('')


    const status = computed(() => {
      if(new Date(date.value).toLocaleDateString() < new Date().toLocaleDateString()) {
        return 'cancelled'
      } else {
        return 'active'
      }
    })

    const isValid = computed( () => {
      return title.value.length > 3 && date.value !== null && description.value.length > 5
    })


    function createTask() {
      const data = {
        id: uuidv4(),
        title: title.value,
        date: date.value,
        description: description.value,
        status: status.value
      }
      store.dispatch('fetchTask', data)
    }

    function submitForm() {
      if (isValid.value) {
        createTask()
        router.push('/tasks')
      }
    }

    return {
      title,
      date,
      description,
      submitForm,
      isValid,
      status
    }
  }
}
</script>