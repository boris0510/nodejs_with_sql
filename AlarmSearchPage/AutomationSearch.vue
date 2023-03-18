<template>
  <Loading :active="isLoading" />
  <div class="AutomationSearch mt-2">
    <h4 class="fw-bold">Automation異常查詢</h4>
    <div class="d-flex align-items-center mb-3">
      <label for="startTime">
        <input
          type="datetime-local"
          name="time"
          id="startTime"
          v-model="historyStartTime"
        />
      </label>
      ~
      <label for="endTime">
        <input
          type="datetime-local"
          name="time"
          id="endTime"
          v-model="historyEndTime"
        />
      </label>
      <button class="btn btn-dark btn-sm ms-2 me-2" @click="historyYesterday">
        昨日
      </button>
      <button
        class="btn btn-primary btn-sm me-2"
        @click="historySearch('查詢')"
      >
        異常查詢
      </button>
    </div>
    <hr />
    <h4
      class="fw-bold text-primary"
      v-if="historyData.length === 0 && historySearchBool"
    >
      查無異常資料!
    </h4>
    <div class="table-responsive mt-2" v-if="historyData.length !== 0">
      <h5 class="fw-bold text-primary mt-2">
        查詢結果&emsp;共{{ historyData.length }}筆
      </h5>
      <table class="table table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">單號</th>
            <th scope="col">狀態</th>
            <th scope="col">發生時間</th>
            <th scope="col">結束時間</th>
            <th scope="col">處理時間(分)</th>
            <th scope="col">機台</th>
            <th scope="col">LotID</th>
            <th scope="col">大分類</th>
            <th scope="col">中分類</th>
            <th scope="col">小分類</th>
            <th scope="col">異常敘述</th>
            <th scope="col">一線處理</th>
            <th scope="col">班別</th>
            <th scope="col">開單人</th>
            <th scope="col">結單人</th>
            <th scope="col">轉單組別</th>
            <th scope="col">Class</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in historyData" :key="item.number">
            <td>{{ index + 1 }}.</td>
            <td>{{ item.number }}</td>
            <td>{{ item.state }}</td>
            <td style="width: 110px">{{ item.startTime.replace('T', ' ') }}</td>
            <td style="width: 110px">{{ item.endTime.replace('T', ' ') }}</td>
            <td>{{ item.useTime }}</td>
            <td>{{ item.machine }}</td>
            <td>{{ item.lotID }}</td>
            <td>{{ item.first_item }}</td>
            <td>{{ item.second_item }}</td>
            <td>{{ item.third_item }}</td>
            <td style="width: 250px">{{ item.reason.reason }}</td>
            <td style="width: 250px">{{ item.approach.approach }}</td>
            <td>{{ item.shift }}</td>
            <td>{{ item.operator }}</td>
            <td>{{ item.terminator }}</td>
            <td>{{ item.team }}</td>
            <td>{{ item.class }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    ref="boxModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h4 class="fw-bold">{{ strModal }}</h4>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-dismiss="modal"
            @click="strModal = ''"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  name: 'AutomationSearch',
  data() {
    return {
      isLoading: false,
      historyStartTime: '',
      historyEndTime: '',
      historyData: [],
      historySearchBool: false,
      boxModal: '',
      strModal: '',
    };
  },
  methods: {
    historySearch(str) {
      if (this.historyStartTime === '' || this.historyEndTime === '') {
        this.strModal = '請填入時間！';
        this.boxModal.show();
        return;
      }
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_AUTOMATION_API_URL}/automation_data?startTime=${this.historyStartTime}&endTime=${this.historyEndTime}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.historyData = res.data.data;
            this.historyData.forEach((item) => {
              item.reason = item.reason === null ? { reason: '', file: [] } : JSON.parse(item.reason);
              item.approach = item.approach === null ? { approach: '', file: [] } : JSON.parse(item.approach);
            });
            this.historySearchBool = true;
            this.strModal = `${str}成功！`;
            this.boxShow = false;
            this.boxModal.show();
            this.isLoading = false;
            console.log('get automation_data success');
          } else {
            this.strModal = '查無此時間異常！';
            this.boxModal.show();
            this.isLoading = false;
            console.log('get automation_data error');
          }
        })
        .catch((error) => {
          this.strModal = `${str}失敗！`;
          this.boxModal.show();
          this.isLoading = false;
          console.log('get automation_data error');
          console.error(error);
        });
    },
    historyYesterday() {
      let beforeDate = new Date(
        new Date().getTime() - 16 * 60 * 60 * 1000,
      ).toISOString();
      let nowDate = new Date(
        new Date().getTime() + 8 * 60 * 60 * 1000,
      ).toISOString();
      beforeDate = beforeDate.substring(0, 10);
      nowDate = nowDate.substring(0, 10);
      this.historyStartTime = `${beforeDate}T07:30`;
      this.historyEndTime = `${nowDate}T07:30`;
    },
    openModal() {
      this.boxModal.show();
    },
  },
  mounted() {
    this.boxModal = new Modal(this.$refs.boxModal);
  },
};
</script>

<style scoped>
td {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
