<script>
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from './components/Header.vue';
import { provideVersion } from './version';

export default defineComponent({
  name: 'App',
  components: { Header },
  setup() {
    const { dispatch } = useStore();
    provideVersion();

    onMounted(() => {
      dispatch('onSetYear', new Date().getFullYear());
    });
  }
});
</script>

<template>
<Header />
  <RenderTest/>
  <br/>
  <TestUseDirective/>
  <br/>
  <RenderDirectives/>
  <br/>
  <p v-theme="`secondary`">This text will change color based on the directive value!</p>
  <simple-ico-home></simple-ico-home>
  <simpleIcoHome/>
  <br/>
  <simpleIcoHomeFn/>
  <br/>
  <ico></ico>
<router-view />
</template>
