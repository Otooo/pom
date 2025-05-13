<template>
	<div id="app">
		<h1>My Calendar</h1>
		<CalendarView
			:show-date="showDate"
			class="theme-default holiday-us-traditional holiday-us-official">
			<template #header="{ headerProps }">
				<CalendarViewHeader
					@input="setShowDate" />
			</template>
		</CalendarView>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
import { format } from 'date-fns';

import "vue-simple-calendar/dist/vue-simple-calendar.css"
// The next two lines are optional themes
import "vue-simple-calendar/dist/css/default.css"
import "vue-simple-calendar/dist/css/holidays-us.css"

const showDate = ref(new Date())


const setShowDate = (d) => {
  showDate.value = d
}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		height: 67vh;
		width: 90vw;
		margin-left: auto;
		margin-right: auto;
	}
</style>