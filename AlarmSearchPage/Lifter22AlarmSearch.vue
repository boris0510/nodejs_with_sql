<template>
  <Loading :active="isLoading" />
  <div class="Lifter22Search mt-2">
    <h4 class="fw-bold">K22Lifter異常查詢</h4>
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
      v-if="historyData.length === 0 && searchBool"
    >
      查無異常資料!
    </h4>
    <div class="table-responsive mt-2" v-if="historyData.length !== 0">
      <h5 class="fw-bold text-primary mt-2">
        異常查詢結果&emsp;共{{ historyData.length }}筆
      </h5>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">年</th>
            <th scope="col">日期</th>
            <th scope="col">發生時間</th>
            <th scope="col">結束時間</th>
            <th scope="col">處理時間(分)</th>
            <th scope="col">樓層</th>
            <th scope="col">異常位置</th>
            <th scope="col">CarrierID</th>
            <th scope="col">alarmCode</th>
            <th scope="col">異常真因</th>
            <th scope="col">處理方法</th>
            <th scope="col">備註</th>
            <th scope="col">班別</th>
            <th scope="col">處理人員</th>
            <th scope="col">Class</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in historyData" :key="item.id">
            <td>{{ index + 1 }}.</td>
            <td>{{ item.year }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.startTime }}</td>
            <td>{{ item.endTime }}</td>
            <td>{{ item.useTime }}</td>
            <td>{{ item.floor }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.carrierID }}</td>
            <td>{{ item.alarmCode }}</td>
            <td style="width: 300px">{{ item.reason }}</td>
            <td style="width: 450px">{{ item.approach }}</td>
            <td>{{ item.remark }}</td>
            <td>{{ item.shift }}</td>
            <td>{{ item.personnel }}</td>
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
  name: 'Lifter22Search',
  data() {
    return {
      isLoading: false,
      historyStartTime: '',
      historyEndTime: '',
      historyData: [],
      searchBool: false,
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
      const api = `${process.env.VUE_APP_CIM_ESERVICES_LIFTER22_ALARM_API_URL}/lifter22_alarm_data?startTime=${this.historyStartTime}&endTime=${this.historyEndTime}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.historyData = res.data.data;
            this.searchBool = true;
            this.strModal = `${str}成功！`;
            this.boxModal.show();
            this.isLoading = false;
            console.log('get lifter22_alarm_data success');
          } else {
            this.strModal = '查無此時間異常！';
            this.boxModal.show();
            this.isLoading = false;
            console.log('get lifter22_alarm_data error');
          }
        })
        .catch((error) => {
          this.strModal = `${str}失敗！`;
          this.boxModal.show();
          this.isLoading = false;
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
