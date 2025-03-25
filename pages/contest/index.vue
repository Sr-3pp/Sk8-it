<script setup lang="ts">
import type { Contest } from '~/types/contest'

const { getContests, deleteContest } = useContest()
const contestModal = ref()
const contestDetail = ref()

const { data: contests } = await useAsyncData('contests', (): Promise<{ data: Contest[] }> => getContests())

const currentContest = ref(null)

const deleteHandler = (id: number, idx: number) => {
  deleteContest(String(id))
  contests.value!.data.splice(idx, 1)
}

const mapSw = ref(false)

const openForm = () => {
  mapSw.value = false
  contestModal.value.toggleDialog()
  mapSw.value = true
}
</script>

<template lang="pug">
.contest
  Banner(picture="https://picsum.photos/1100/200")
  Container
    h1 Contest
    button(@click="openForm") Open modal
    ul
      li(v-for="(contest, i) in contests.data" :key="contests.id")
        p {{ contest.name }}
        button(@click="currentContest = contest; contestDetail.toggleDialog()") detail
        button(@click="deleteHandler(contest.id)") delete
  Modal(ref="contestModal")
    template(#body)
      ContestForm(v-if="mapSw" @add:contest="contests.data.push($event)")
  Modal(ref="contestDetail")
    template(#body)
      ContestDetail(:contest="currentContest")
</template>

<style lang="scss">
.top-bar ~ .contest .banner{
  margin-top: unit(-40);
}
</style>
