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
  },
  methods: {
    test() {
      alert('test')
    }
  }
});
</script>

<template>
<Header />
  <button @click="test">Click Me!</button>
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
<!--  <icoTest/>-->
  <br/>
<!--  <exampleIco name="ico-home"/>-->
  <br/>
  <ico name="home"></ico>
  <ico name="accessibility"></ico>
  <ico name="accessibility"></ico>
  <ico name="not_exist_not_broken_icons"></ico>
  <ico name="acc" size="54" color="#f00"></ico>
  <ico name="anyname" size="124" color="green"/>
  <ico name="acc" size="54" color="#f00"></ico>
  <ico name="home-tt" size="124" color="gray"/>
<router-view />
  <div v-demo="{ color: 'white', text: 'hello!' }"></div>
</template>
