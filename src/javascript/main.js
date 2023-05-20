import { createApp, withDirectives, h, resolveDirective, createElementVNode, withModifiers } from 'vue';
import { EMPTY_OBJ } from '@vue/shared';
import App from './App.vue';
import store from './store';
import router from './router';
import AtSign from './at-sign';
import './custom-element';

const app = createApp(App);

/// vue3 ico test
const icoWrapper = function(svg, s, c) {
    return '<svg fill="' + (c || 'currentcolor') + '" width="' + (s || 24) + '" height="' + (s || 24) + '" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
};
const icoHome = (s, c) => icoWrapper('<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>', s, c);
const icoHomeTwoTone = (s, c) => icoWrapper('<path d="M19,11v9h-5v-6h-4v6H5v-9H3.6L12,3.4l8.4,7.6H19z" opacity=".3"></path><path d="M20,21h-7v-6h-2v6H4v-9H1l11-9.9L23,12h-3V21z M15,19h3v-8.8l-6-5.4l-6,5.4V19h3v-6h6V19z"></path>', s, c);
const icoAccessibility = (s, c) => icoWrapper('<path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>', s, c);

// step 1
app.component('simpleIcoHome', {
        render() {
            return h('span', {
                    innerHTML: '<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg"><<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
                }
            )
        }
    }
)

// step 2
app.component('simpleIcoHomeFn', {
        render() {
            return h('span', {
                    innerHTML: icoHome()
                }
            )
        }
    }
)

///

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

app.directive("icoHome", {
    mounted(el, binding) {
        // console.log('el:',el)
        // console.log('binding:',binding)
        el.innerHTML = icoHome()
    }
})

app.component('icoTest', {
        render() {
            return h('div',
                withDirectives(
                    h('span'),
                    [
                        [resolveDirective('icoHome')]
                    ]
                )
            )
        }
    }
)

app.component('exampleIco', {
        props: ['name'],
        render() {
            return h('div',
                withDirectives(
                    h('span'),
                    [
                        [resolveDirective('icoHome')]
                    ]
                )
            )
        }
    }
)


const VueIco = {
    install(Vue, options) {

         for (const [key, value] of Object.entries(options)) {

             console.log('app:', Vue)
             console.log('options:', options)
             console.log('element options:', Object.entries(options)[0][1]['name'])
             const name = value['name']
             var icoFn = value;
             console.log('namespace:', name)

             Vue.directive(name, {
                 mounted(el, binding) {
                     icoFn = binding.arg;
                     console.log('el:', el)
                     console.log('binding:', binding)
                     console.log('icoFn:', icoFn)
                     console.log('test')
                     el.innerHTML = icoFn.call(null, binding.modifiers.size, binding.modifiers.color);
                     console.log('el.innerHTML:', el.innerHTML)
                 }
             })
         }

            console.log('resDirective ->', resolveDirective)
            console.log('withDirectives ->', withDirectives)
            app.component('ico', {
                    props: {
                        name: {
                            type: [String, Function]
                        },
                        size: {
                            type: [String, Number],
                            default: 24
                        },
                        color: {
                            type: [String]
                        },
                    },
                    render() {
                        let vnode = createElementVNode('span');
                        console.log('this.name::', this.name)
                        console.log('icoFn::', icoFn)
                        console.log('options::', options)
                        if (options[this.name] !== undefined) {
                            let directives = [[resolveDirective( options[this.name]['name'] )]];
                            let dir, value, arg, modifiers = {};
                            for (let i = 0; i < directives.length; i++) {
                                [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
                            }

                            return h('span',
                                withDirectives(
                                    vnode, [[dir, value, options[this.name], {'size': this.size, 'color': this.color}]]
                                )
                            )
                        }
                    }
                }
            )
    }
}


app.directive('demo', (el, binding) => {
    console.log(binding.value.color) // => "white"
    console.log(binding.value.text) // => "hello!"
})

app.use(VueIco, {
    "home-tt" : icoHomeTwoTone,
    "anyname": icoHome,
    "home": icoHome,
    "acc": icoAccessibility
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
