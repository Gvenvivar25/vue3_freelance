import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      tasks: []
    }
  },
  getters: {
    statusCounter(state) {
      return state.tasks.filter(task => task.status === 'active').length
    }
  },
  mutations: {
    getTasks(state, response) {
      state.tasks = Object.keys(response).map(key => {
        return {
          idFirebase: key,

          ...response[key]
        }
      })
    },
    addTask(state, newTask) {
      state.tasks.push(newTask)
    },

    changeStatus(state, payload) {
      const task = state.tasks.find( item => item.id === payload.id)
      task.status = payload.status
    }
  },

  actions: {
    async fetchTasks({commit}) {
      try {
        const response = await fetch('https://vue-tasks-freelance-default-rtdb.firebaseio.com/tasks.json')
          .then(response => response.json())
        commit('getTasks', response)
      } catch (e) {
        console.log(e)
      }
    },

    async fetchTask({commit}, newTask) {
      try {
        await fetch('https://vue-tasks-freelance-default-rtdb.firebaseio.com/tasks.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
        })
        commit('addTask', newTask)
      } catch (e) {
        console.log(e)
      }
    },

    async fetchStatus(context, payload) {
      const task = context.state.tasks.find( item => item.id === payload.id)
      try {
        await fetch(`https://vue-tasks-freelance-default-rtdb.firebaseio.com/tasks/${task.idFirebase}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: payload.status
          })
        })
        context.commit('changeStatus', payload)
      } catch (e) {
        console.log(e)
      }
    }
  }
})

export default store