<template>
    <div class="table-wrapper" ref="tableWrapper">
        <div ref="scroll-box" :style="{'height':height+'px'}" class="scrollBox">
            <table class="table" ref="table" :class="{border,stripe}">
            <!-- 表头 -->
            <thead>
                <tr>
                    <th style="width: 50px;"><input type="checkbox" ref="checkAll" :checked="checkAllStatus" @change="changeAllItems"></th>
                    <th v-for="column in columns" :key="column.key">
                        {{column.title}}
                        <icon v-if="column.key in sortBy" class="iconfont pb-icon-adjust"></icon>
                    </th>
                </tr>
            </thead>
            <!-- 表体 -->
            <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td style="width: 50px;"><input type="checkbox" :checked="selectedItems.some(item=>item.id===row.id)" @change="changeItem(row,$event)"></td>
                    <td v-for="column in columns" :key="column.key">
                        {{row[column.key]}}
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
        
    </div>
</template>

<script>
export default {
    props:{
        selectedItems: {
            type:Array,
            default:()=>[]
        },
        sortBy: {
            type: Object,
            default: ()=>({})
        },
        border: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array,
            default:() => []
        },
        data: {
            type: Array,
            default: () => []
        },
        stripe: {
            type:Boolean,
            default: true
        },
        height: {
            type: Number,
            default: 400
        }
    },
    data(){
        return{}
    },
    mounted(){
        this.table = this.$refs.table;
        this.tableWrapper = this.$refs.tableWrapper
        let copyTable = this.$refs.table.cloneNode();
        let thead = this.table.children[0]
        this.tableWrapper.style.paddingTop = thead.getBoundingClientRect().height+'px';
        copyTable.appendChild(thead)
        this.tableWrapper.appendChild(copyTable)

        copyTable.classList.add('fiex-header')
    },
    watch: {
        selectedItems(){
            if(this.selectedItems.length !== this.data.length){
                if(this.selectedItems.length !== 0){
                    return this.$refs.checkAll.indeterminate = true
                }
            }
            this.$refs.checkAll.indeterminate = false
        }
    },
    computed:{
        checkAllStatus(){
            return this.data.length === this.selectedItems.length
        }
    },
    methods: {
        changeAllItems(e){
            this.$emit('update:selectedItems',e.target.checked?this.data:[])
        },
        changeItem(row,e){
            let copySelectItem = JSON.parse(JSON.stringify(this.selectedItems))
            
            if(e.target.checked){
                copySelectItem.push(row)
            }else{
                let idx = copySelectItem.findIndex(item=>item.id===row.id)
                copySelectItem.splice(idx,1)
                
            }
            this.$emit('update:selectedItems',copySelectItem)
            console.log(copySelectItem)
            console.log(row,e.target.checked)
        }
    }
}
</script>

<style lang="css" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .scroll-box {
        overflow: auto;
    }
    .table-wrapper {
        width: 80%;
        margin: 0 auto;
        position: absolute;
    }
    table{
        border-collapse: collapse;
        border-spacing: 0;
        width:100%;
    }
    table.border{
        border: 1px solid #e1e1e1;
    }
    table.border tr , table.border td ,table.border th{
        border: 1px solid #e1e1e1;
    }
    table.stripe tbody tr:nth-child(even){
        background:#eee
    }
    th{
        background: #e1e1e1;
    }
    th,tr,td{
        border-bottom: 1px solid #e1e1e1;
        text-align: center;
        padding: 8px;
    }
</style>