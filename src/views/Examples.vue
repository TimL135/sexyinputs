<template>
    <div class="d-flex justify-content-center">
        <form action="" class="formWidth" @submit.prevent="login">
            <Search placeholder="search" v-model="search" :label-border="true">
                <template v-slot:icon>
                    <svg
                        @click="console.log('f')"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                        />
                    </svg>
                </template>
            </Search>
            <Email placeholder="email" v-model="email" :label-border="true" errorColor="black">
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
            <Text placeholder="Username" v-model="username"></Text>
            <Number placeholder="number" v-model="number" max="100" min="0"></Number>
            <Date placeholder="Date" v-model="date" error="'Hello World! <br> This is my string\n With different newlines'">
                <template v-slot:icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512">
                        <path
                            d="M352 111.1c22.09 0 40-17.88 40-39.97S352 0 352 0s-40 49.91-40 72S329.9 111.1 352 111.1zM224 111.1c22.09 0 40-17.88 40-39.97S224 0 224 0S184 49.91 184 72S201.9 111.1 224 111.1zM383.1 223.1L384 160c0-8.836-7.164-16-16-16h-32C327.2 144 320 151.2 320 160v64h-64V160c0-8.836-7.164-16-16-16h-32C199.2 144 192 151.2 192 160v64H128V160c0-8.836-7.164-16-16-16h-32C71.16 144 64 151.2 64 160v63.97c-35.35 0-64 28.65-64 63.1v68.7c9.814 6.102 21.39 11.33 32 11.33c20.64 0 45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C114.1 348.3 139.4 367.1 160 367.1s45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C242.1 348.3 267.4 367.1 288 367.1s45.05-19.73 52.7-27.33c6.25-6.219 16.34-6.219 22.59 0C370.1 348.3 395.4 367.1 416 367.1c10.61 0 22.19-5.227 32-11.33V287.1C448 252.6 419.3 223.1 383.1 223.1zM352 373.3c-13.75 10.95-38.03 26.66-64 26.66s-50.25-15.7-64-26.66c-13.75 10.95-38.03 26.66-64 26.66s-50.25-15.7-64-26.66c-13.75 10.95-38.03 26.66-64 26.66c-11.27 0-22.09-3.121-32-7.377v87.38C0 497.7 14.33 512 32 512h384c17.67 0 32-14.33 32-32v-87.38c-9.91 4.256-20.73 7.377-32 7.377C390 399.1 365.8 384.3 352 373.3zM96 111.1c22.09 0 40-17.88 40-39.97S96 0 96 0S56 49.91 56 72S73.91 111.1 96 111.1z"
                        />
                    </svg>
                </template>
            </Date>
            <Time placeholder="Time" v-model="time" :error="errors.time"></Time>
            <File placeholder="File" v-model="file" :preview="true"></File>
            <MultiFile
                placeholder="Multi File"
                :file-array="fileArray"
                :preview="true"
                @addFile="
                    newFiles => {
                        console.log(newFiles)
                        fileArray = fileArray.concat(...newFiles)
                        fileArray = fileArray.filter((v, i, a) => a.findIndex(e => e.name == v.name) === i)
                    }
                "
                @deleteFile="
                    index => {
                        fileArray = fileArray.filter((v, i) => i != index)
                    }
                "
            >
                <template v-slot:button>datei auswählen</template>
            </MultiFile>
            <Textarea placeholder="Text" v-model="text" :labelBorder="true"></Textarea>
            <Range placeholder="Volume" v-model="range" :sideWidth="15"></Range>
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
                side-input-type="number"
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
                :match-from-start="true"
                btn-type="button"
            >
                <template v-slot:button>test</template>
            </Select>

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
                side-input-type="number"
            ></MultiSelect>
            <div class="w-50">
                <Button type="button"><template v-slot:button>Test</template></Button>
            </div>
            <Checkbox v-model="checkbox" class="mt-1"><template v-slot:text>hello world</template></Checkbox>
            <Radiobuttons v-model="radiobutton" :options="radioOptions" :row="true"></Radiobuttons>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import * as Inputs from '../components/SexyInputs/index'

export default defineComponent({
    setup() {
        return {
            console,
        }
    },
    components: { ...Inputs },
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
            multiFile: null,
            fileArray: [] as any[],
            select: '',
            select2: '',
            multiSelectText: '',
            multiSelect: ['1'],
            range: 0,
            array: [] as any[],
            text: '',
            search: '',
            errors: {} as any,
            checkbox: false,
            radiobutton: '',
            radioOptions: [
                { value: 1, text: 'eins' },
                { value: 2, text: 'zwei' },
                { value: 3, text: 'drei' },
            ],
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
.formWidth {
    width: 80%;
    @media (min-width: 850px) {
        width: 25vw;
    }
}
</style>
