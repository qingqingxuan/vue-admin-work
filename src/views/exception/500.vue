<template>
  <div class="main-container">
    <ExceptionStatus status="500" />
  </div>
</template>

<script>
import ExceptionStatus from './components/ExceptionStatus'
export default {
  name: 'Page500',
  components: {
    ExceptionStatus
  }
}
</script>
