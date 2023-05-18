import { createApp, withDirectives, h, resolveDirective } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import AtSign from './at-sign';
import './custom-element';

const app = createApp(App);

app.component('RenderTest', {
    render() {
        return h('span', 'test render h()')
        }
    }
)

app.component('RenderDirectives', {
        render() {
            return h('span', {
                innerHTML: 'hello',
                directives: [{
                    name: 'theme',
                    arg: 'tertiary',
                }]
            })
        }
    }
)

// https://www.digitalocean.com/community/tutorials/how-to-use-built-in-and-custom-directives-in-vue-js
app.directive("theme", {
    mounted(el, binding) {
        if (binding.value === 'primary') {
            el.style.color = 'red'
        } else if (binding.value === 'secondary') {
            el.style.color = 'green'
        } else if (binding.value === 'tertiary') {
            el.style.color = 'blue'
        } else {
            el.style.color = 'black'
        }
    }
})

app.component('TestUseDirective', {
    render() {
        const vnode = h('div',  'test use vnode');
        const theme = resolveDirective('theme');
        const vNodeWithDirectives = withDirectives(h('div', 'test use Directive'),
            [
                [theme, 'tertiary']
            ]
        )
        return h('div',
            [
                // первый элемент
                'test multi elements: ',
                // второй элемент
                h('button', {
                        onClick: () => {
                            alert('onClick!')
                        },
                        style: {
                            color: 'red'
                        },
                        // innerHTML: 'test render h element' ,
                        '^width': '100',
                        '.name': 'some-name',
                        id: 'foo',
                    },
                'test render h element <innerHTML>'),
                // третий элемент
                h('div', vnode),
                // четвертый элемент
                h('div', vNodeWithDirectives)
            ]
        )
    }
})



app.config.isCustomElement = tag => /^x-/.test(tag);
app.use(store).use(router);
app.directive('AtSign', AtSign);
app.mount('#app');
