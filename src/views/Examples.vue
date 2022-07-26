<template>
    <div class="d-flex justify-content-center">
        <form action="" style="width: 25%" @submit.prevent="login">
            <Search placeholder="search" v-model="search" :label-border="true">
                <template v-slot:icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                        />
                    </svg>
                </template>
            </Search>
            <Email placeholder="email" v-model="email" :label-border="true">
                <template v-slot:button>test</template>
            </Email>
            <Password
                placeholder="Password"
                v-model="password"
                class="mt-4"
                :labelBorder="true"
                :error="errors.password"
                required
                data-test="password"
            ></Password>
            <button class="mt-3">login</button>

            <Text placeholder="Username" v-model="username"></Text>
            <Number placeholder="number" v-model="number" max="100" min="0"></Number>
            <Date placeholder="Date" v-model="date" :error="errors.date"></Date>
            <Time placeholder="Time" v-model="time" :error="errors.time"></Time>
            <File placeholder="File" v-model="file"></File>
            <Textarea placeholder="Text" v-model="text" :labelBorder="true"></Textarea>
            <Range placeholder="Volume" v-model="range" sideWidth="15%"></Range>
            <Select
                placeholder="Select"
                v-model="select"
                :error="errors.select"
                :options="array"
                listClass="text-danger"
                @selectItem="
                    event => {
                        console.log(event)
                    }
                "
                :selectOnBlur="true"
                :controlInput="true"
                data-test="select"
            ></Select>
            <Select
                placeholder="Select2"
                v-model="select2"
                :error="errors.select"
                :options="array"
                @selectItem="
                    event => {
                        console.log(event)
                    }
                "
                :selectOnBlur="false"
                :controlInput="false"
                data-test="select2"
            ></Select>

            <MultiSelect
                placeholder="Multi Select"
                :multiSelect="multiSelect"
                v-model="multiSelectText"
                :error="errors.select"
                :options="array"
                :selectOnBlur="true"
                :controlInput="true"
                @selectItem="
                    event => {
                        multiSelectText = ''
                        multiSelect.push(event)
                    }
                "
                @deleteItem="
                    index => {
                        multiSelect = multiSelect.filter((v, i) => i != index)
                    }
                "
                data-test="multiSelect"
            ></MultiSelect>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SexyInput from '../components/SexyInput.vue'
import Email from '../components/Email.vue'
import Search from '../components/Search.vue'
import Text from '../components/Text.vue'
import Password from '../components/Password.vue'
import Number from '../components/Number.vue'
import Date from '../components/Date.vue'
import Time from '../components/Time.vue'
import File from '../components/File.vue'
import Textarea from '../components/Textarea.vue'
import Range from '../components/Range.vue'
import Select from '../components/Select.vue'
import MultiSelect from '../components/MultiSelect.vue'

export default defineComponent({
    setup() {
        return {
            console,
        }
    },
    components: {
        SexyInput,
        Email,
        Search,
        Text,
        Password,
        Number,
        Date,
        Time,
        File,
        Textarea,
        Range,
        Select,
        MultiSelect,
    },
    data() {
        return {
            key: '',
            number: '',
            time: '',
            email: '',
            username: '',
            password: '',
            date: '',
            file: null,
            select: '',
            select2: '',
            multiSelectText: '',
            multiSelect: ['1'],
            range: 0,
            array: [] as any[],
            text: '',
            search: '',
            errors: {} as any,
        }
    },

    mounted() {
        Object.assign(this.errors, { date: 'dies ist nur ein test fehler' })
        Object.assign(this.errors, {
            time: 'hjsdf hjdds uzffn eiuwm uwnbc iowno pswsd kdskb',
        })
        for (let i = 0; i < 51; i++) this.array.push(JSON.stringify(i))
    },
    methods: {
        login() {
            this.errors = {}
            if (!this.email) Object.assign(this.errors, { email: 'bitte Feld ausfüllen' })
            if (!this.password) Object.assign(this.errors, { password: 'bitte Feld ausfüllen' })
            if (!this.select) Object.assign(this.errors, { select: 'bitte Feld ausfüllen' })
            if (!Object.keys(this.errors).length) this.console.log('login')
        },
    },
})
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
