<template>
  <div class="main-container">
    <ExceptionStatus status="404" />
  </div>
</template>

<script>
import ExceptionStatus from './components/ExceptionStatus'
export default {
  name: 'Page404',
  components: {
    ExceptionStatus
  }
}
</script>
