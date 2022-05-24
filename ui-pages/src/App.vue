<template>
  <div id="app">
    <div class="formbox">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="端口号:">
          <el-col :span="12">
            <el-input v-model="form.port" placeholder="请输入端口号"></el-input>
          </el-col>
          <el-col :span="12" class="center-box">
            <el-button v-show="!state" type="primary" @click="create()" round>创建websocket服务</el-button>
            <el-button v-show="state" type="danger" @click="close()" round>关闭websocket服务</el-button>
          </el-col>
        </el-form-item>

        <el-form-item>
          <div class="table-el">
            <div class="tool">
              <el-button type="primary" size="mini" @click="queryUser" circle icon="el-icon-refresh"></el-button>
            </div>
            <el-table ref="mainTable" border max-height="200" :data="tableData" style="width: 100%;"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="key" label="key">
              </el-table-column>
              <el-table-column prop="path" label="地址">
              </el-table-column>
              <el-table-column prop="origin" label="来源">
              </el-table-column>

            </el-table>
          </div>
        </el-form-item>

        <el-form-item label="发送消息:">

          <el-input type="textarea" placeholder="请输入需要发送的信息"  :rows="4" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="send-msg" type="primary" round @click="onSubmit">发送消息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      state: false,
      form: {
        port: 9001,
        desc: '{"code": 200,"data": {"msg": "HELLO WORLD"}}'
      },
      tableData: [],
      selectUser: [],
    }
  },
  created() {
    window.IfIsSuccessful = (res) => {
      this.state = res
    }
  },
  methods: {
    close(){
      window.CloseWebsocket()
    },
    handleSelectionChange(user) {
      this.selectUser = user;
    },
    queryUser() {
      this.tableData = window.QueryUser()
      this.$nextTick(() => {
        this.$refs.mainTable.toggleAllSelection()
      })
    },
    onSubmit() {
      if (this.selectUser.length === 0) {
        this.$message({
          message: '请选择至少一个用户!',
          type: 'warning'
        });
        return false
      }
      window.WebSocketSend(this.form.desc, this.selectUser)
    },
    create() {
      window.initWebScoket(this.form.port)
    }
  }
}
</script>

<style lang="scss">
.formbox {
  padding: 10px 40px;

  .center-box {
    text-align: center;
  }

  .send-msg {
    vertical-align: bottom;
  }

  .table-el {

    .tool {
      text-align: right;
    }
  }
}

.port-input {
  width: 200px !important;
}
</style>
