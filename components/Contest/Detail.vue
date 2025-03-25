<script setup lang="ts">
import type { Contest } from '~/types/contest'

const props = defineProps<{
  contest: Contest
}>()

const participant = ref({
  name: '',
  stance: '',
  sponsors: '',
})

const myContest = computed(() => {
  const contest = props.contest
  if (contest) {
    if(typeof contest.prizes === 'string') contest.prizes = contest.prizes.split(',')
    if(typeof contest.sponsors === 'string') contest.sponsors = JSON.parse(contest.sponsors)
    if(typeof contest.participants === 'string') contest.participants = JSON.parse(contest.participants)
  }
  return contest
})

const updateContest = () => {
  console.log(myContest.value)
}
</script>

<template lang="pug">
.contest-detail
  template(v-if="myContest")
    figure
      img(:src="`/blob/${myContest.banner}`" :alt="myContest.name")
    FormInput(v-model="myContest.name" type="text" label="Contest name")
    FormInput(v-model="myContest.date" type="date" label="Contest date")
    FormInput(v-model="myContest.cost" type="number" label="Contest cost")
    FormInput(v-model="myContest.description" type="textarea" label="Contest description")

    p {{ myContest.address }}
    p {{ myContest.latlng }}
    ul
      li
        form(@submit.prevent="myContest.participants.push({...participant})")
          FormInput(v-model="participant.name" type="text" label="Participant name")
          FormInput(v-model="participant.stance" type="text" label="Participant stance")
          FormInput(v-model="participant.sponsors" type="text" label="Participant sponsors")
          button(type="submit") Add participant
      li(v-for="participant in myContest.participants" :key="participant.id")
        FormInput(v-model="participant.name" type="text" label="Participant name")
        FormInput(v-model="participant.stance" type="text" label="Participant stance")
        FormInput(v-model="participant.sponsors" type="text" label="Participant sponsors")
    ul
      li(v-for="(prize, i) in myContest.prizes" :key="prize.id")
        FormInput(v-model="myContest.prizes[i]" type="text" label="Prize")
    ul
      li(v-for="sponsor in myContest.sponsors" :key="sponsor.id")
        p {{ sponsor.name }}
    button(@click="myContest.status = !myContest.status") Toggle status {{ myContest.status }}
    button(@click="updateContest") Save
</template>

<style scoped></style>
