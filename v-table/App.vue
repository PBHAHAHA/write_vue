<template>
    <div>
        <p-table 
        :columns="columns1" 
        :data="data1"
        border
        stripe
        :selectedItems.sync="selectedItems"
        :sortBy.sync="sortBy"
        :height="100"
        ></p-table>
        {{selectedItems}}
    </div>
</template>

<script>
import PTable from './components/p-table.vue'
export default {
    components: {
        PTable
    },
    data(){
        return {
            sortBy:{
                // name: false, //能排序
                age: 'asc',
                address: 'desc'
            },
            selectedItems: [],// 当前用户选中了哪一项
            columns1: [{
                title: 'Name',
                key: "name"
            },{
                title: "Age",
                key: 'age'
            },{
                title: "Address",
                key: 'address'
            }],
            data1: [{
                id: 1,
                name: 'Ponat Robait',
                age: 23,
                address: '四川省成都市武侯区',
                date: '2021-09-14'
            },{
                id: 2,
                name: 'Ponat Robait',
                age: 23,
                address: '四川省成都市武侯区',
                date: '2021-09-14'
            },{
                id: 3,
                name: 'Ponat Robait',
                age: 23,
                address: '四川省成都市武侯区',
                date: '2021-09-14'
            }]
        }
    }
}
</script>