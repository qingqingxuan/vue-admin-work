<template>
  <div class="main-container">
    <ExceptionStatus status="403" />
  </div>
</template>

<script>
import ExceptionStatus from './components/ExceptionStatus'
export default {
  name: 'Page403',
  components: {
    ExceptionStatus
  }
}
</script>
