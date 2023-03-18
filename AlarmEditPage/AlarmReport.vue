<template>
  <Loading :active="isLoading" />
  <div class="AlarmReport">
    <div class="container-fluid">
      <h3 class="fw-bold text-primary mt-3 mb-3">{{ today }} AMHS 管理日報&emsp;{{ StartTimeS }} ~ {{ EndTimeS }}</h3>
      <hr>
      <h5 class="fw-bold text-primary" v-if="Mirle21AlarmData.length === 0">B7_K21_2F_AMHS異常&emsp;NA</h5>
      <div class="table-responsive" v-if="Mirle21AlarmData.length !== 0">
        <h5 class="fw-bold text-primary">B7_K21_2F_Mirle_AMHS異常&emsp;共{{ Mirle21AlarmData.length }}筆</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">年</th>
              <th scope="col">日期</th>
              <th scope="col">發生時間</th>
              <th scope="col">結束時間</th>
              <th scope="col">處理時間(分)</th>
              <th scope="col">機台分類</th>
              <th scope="col">機台號碼</th>
              <th scope="col">CarrierID</th>
              <th scope="col">異常真因</th>
              <th scope="col">處理方法</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in Mirle21AlarmData" :key="item.id">
              <td>{{ index + 1 }}.</td>
              <td>{{ item.year }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.startTime }}</td>
              <td>{{ item.endTime }}</td>
              <td>{{ item.useTime }}</td>
              <td>{{ item.machine }}</td>
              <td>{{ item.machineNumber }}</td>
              <td>{{ item.carrierID }}</td>
              <td style="width:450px">{{ item.reason }}</td>
              <td style="width:450px">{{ item.approach }}</td>
              <td>{{ item.remark }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5 class="fw-bold text-primary" v-if="MuratecAlarmData.length === 0">B5_AMHS異常&emsp;NA</h5>
      <div class="table-responsive" v-if="MuratecAlarmData.length !== 0">
        <h5 class="fw-bold text-primary">B5_村田_AMHS異常&emsp;共{{ MuratecAlarmData.length }}筆</h5>
        <table class="table table-sm table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">年</th>
              <th scope="col">日期</th>
              <th scope="col">發生時間</th>
              <th scope="col">結束時間</th>
              <th scope="col">處理時間(分)</th>
              <th scope="col">異常位置</th>
              <th scope="col">CarrierID</th>
              <th scope="col">AMHS System</th>
              <th scope="col">分類</th>
              <th scope="col">異常真因</th>
              <th scope="col">處理方法</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in MuratecAlarmData" :key="item.id">
              <td>{{ index + 1 }}.</td>
              <td>{{ item.year }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.startTime }}</td>
              <td>{{ item.endTime }}</td>
              <td>{{ item.useTime }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.carrierID }}</td>
              <td>{{ item.amhsSystem }}</td>
              <td>{{ item.classIfication }}</td>
              <td style="width:450px">{{ item.reason }}</td>
              <td style="width:450px">{{ item.approach }}</td>
              <td>{{ item.remark }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5 class="fw-bold text-primary" v-if="Mirle24AlarmData.length === 0">B6_K24_4F_AMHS異常&emsp;NA</h5>
      <div class="table-responsive" v-if="Mirle24AlarmData.length !== 0">
        <h5 class="fw-bold text-primary">B6_K24_4F_Mirle_AMHS異常&emsp;共{{ Mirle24AlarmData.length }}筆</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">年</th>
              <th scope="col">日期</th>
              <th scope="col">發生時間</th>
              <th scope="col">結束時間</th>
              <th scope="col">處理時間(分)</th>
              <th scope="col">機台分類</th>
              <th scope="col">機台號碼</th>
              <th scope="col">CarrierID</th>
              <th scope="col">異常真因</th>
              <th scope="col">處理方法</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in Mirle24AlarmData" :key="item.id">
              <td>{{ index + 1 }}.</td>
              <td>{{ item.year }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.startTime }}</td>
              <td>{{ item.endTime }}</td>
              <td>{{ item.useTime }}</td>
              <td>{{ item.machine }}</td>
              <td>{{ item.machineNumber }}</td>
              <td>{{ item.carrierID }}</td>
              <td style="width:450px">{{ item.reason }}</td>
              <td style="width:450px">{{ item.approach }}</td>
              <td>{{ item.remark }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5 class="fw-bold text-primary" v-if="Lifter22AlarmData.length === 0">B5_Lifter跨樓層異常&emsp;NA</h5>
      <div class="table-responsive" v-if="Lifter22AlarmData.length !== 0">
        <h5 class="fw-bold text-primary">B5_Lifter跨樓層異常&emsp;共{{ Lifter22AlarmData.length }}筆</h5>
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
              <th scope="col">異常真因</th>
              <th scope="col">處理方法</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in Lifter22AlarmData" :key="item.id">
              <td>{{ index + 1 }}.</td>
              <td>{{ item.year }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.startTime }}</td>
              <td>{{ item.endTime }}</td>
              <td>{{ item.useTime }}</td>
              <td>{{ item.floor }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.carrierID }}</td>
              <td style="width:450px">{{ item.reason }}</td>
              <td style="width:450px">{{ item.approach }}</td>
              <td>{{ item.remark }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5 class="fw-bold text-primary" v-if="GPM22AlarmData.length === 0">B6_K22_3F_GPM_AMHS異常&emsp;NA</h5>
      <div class="table-responsive" v-if="GPM22AlarmData.length !== 0">
        <h5 class="fw-bold text-primary">B6_K22_3F_GPM_AMHS異常&emsp;共{{ GPM22AlarmData.length }}筆</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">年</th>
              <th scope="col">日期</th>
              <th scope="col">發生時間</th>
              <th scope="col">結束時間</th>
              <th scope="col">處理時間(分)</th>
              <th scope="col">機台分類</th>
              <th scope="col">機台號碼</th>
              <th scope="col">CarrierID</th>
              <th scope="col">異常真因</th>
              <th scope="col">處理方法</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in GPM22AlarmData" :key="item.id">
              <td>{{ index + 1 }}.</td>
              <td>{{ item.year }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.startTime }}</td>
              <td>{{ item.endTime }}</td>
              <td>{{ item.useTime }}</td>
              <td>{{ item.machine }}</td>
              <td>{{ item.machineNumber }}</td>
              <td>{{ item.carrierID }}</td>
              <td style="width:450px">{{ item.reason }}</td>
              <td style="width:450px">{{ item.approach }}</td>
              <td>{{ item.remark }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5 class="fw-bold text-primary" v-if="RDHS24AlarmData.length === 0">B6_K24_4F_RDHS異常&emsp;NA</h5>
      <div class="table-responsive" v-if="RDHS24AlarmData.length !== 0">
        <h5 class="fw-bold text-primary">異常查詢結果&emsp;共{{ RDHS24AlarmData.length }}筆</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">年</th>
              <th scope="col">日期</th>
              <th scope="col">發生時間</th>
              <th scope="col">結束時間</th>
              <th scope="col">處理時間(分)</th>
              <th scope="col">櫃號</th>
              <th scope="col">槽位</th>
              <th scope="col">lotID</th>
              <th scope="col">異常真因</th>
              <th scope="col">處理方法</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in RDHS24AlarmData" :key="item.id">
              <td>{{ index + 1 }}.</td>
              <td>{{ item.year }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.startTime }}</td>
              <td>{{ item.endTime }}</td>
              <td>{{ item.useTime }}</td>
              <td>{{ item.cabinet }}</td>
              <td>{{ item.slot }}</td>
              <td>{{ item.lotID }}</td>
              <td style="width:450px">{{ item.reason }}</td>
              <td style="width:450px">{{ item.approach }}</td>
              <td>{{ item.remark }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5 class="fw-bold text-primary" v-if="GPM7AlarmData.length === 0">B6_K7_8F_GPM_AMHS異常&emsp;NA</h5>
      <div class="table-responsive" v-if="GPM7AlarmData.length !== 0">
        <h5 class="fw-bold text-primary">B6_K7_3F_GPM_AMHS異常&emsp;共{{ GPM7AlarmData.length }}筆</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">年</th>
              <th scope="col">日期</th>
              <th scope="col">發生時間</th>
              <th scope="col">結束時間</th>
              <th scope="col">處理時間(分)</th>
              <th scope="col">機台分類</th>
              <th scope="col">機台號碼</th>
              <th scope="col">CarrierID</th>
              <th scope="col">異常真因</th>
              <th scope="col">處理方法</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in GPM7AlarmData" :key="item.id">
              <td>{{ index + 1 }}.</td>
              <td>{{ item.year }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.startTime }}</td>
              <td>{{ item.endTime }}</td>
              <td>{{ item.useTime }}</td>
              <td>{{ item.machine }}</td>
              <td>{{ item.machineNumber }}</td>
              <td>{{ item.carrierID }}</td>
              <td style="width:450px">{{ item.reason }}</td>
              <td style="width:450px">{{ item.approach }}</td>
              <td>{{ item.remark }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlarmReport',
  data() {
    return {
      isLoading: false,
      MuratecAlarmData: [],
      Mirle21AlarmData: [],
      Mirle24AlarmData: [],
      Lifter22AlarmData: [],
      GPM22AlarmData: [],
      GPM7AlarmData: [],
      RDHS24AlarmData: [],
      StartTime: '',
      EndTime: '',
      StartTimeS: '',
      EndTimeS: '',
      toDay: '',
    };
  },
  methods: {
    AllAlarmSearch() {
      this.isLoading = true;
      this.$http.all([
        this.MuratecAlarmSearch(),
        this.Mirle21AlarmSearch(),
        this.Mirle24AlarmSearch(),
        this.Lifter22AlarmSearch(),
        this.GPM22AlarmSearch(),
        this.GPM7AlarmSearch(),
        this.RDHS24AlarmSearch(),
      ]).then(
        this.$http.spread((A, B, C, D, E, F, G) => {
          this.MuratecAlarmData = A.data.data;
          this.Mirle21AlarmData = B.data.data;
          this.Mirle24AlarmData = C.data.data;
          this.Lifter22AlarmData = D.data.data;
          this.GPM22AlarmData = E.data.data;
          this.GPM7AlarmData = F.data.data;
          this.RDHS24AlarmData = G.data.data;
          this.isLoading = false;
          console.log('get AllAlarmSearch success');
        }),
      ).catch((err) => {
        console.log('get AllAlarmSearch error');
        console.error(err);
      });
    },
    MuratecAlarmSearch() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_MURATEC_ALARM_API_URL}/muratec_alarm_data_report?startTime=${this.StartTime}&endTime=${this.EndTime}`;
      return this.$http.get(api);
    },
    Mirle21AlarmSearch() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_MIRLE21_ALARM_API_URL}/mirle21_alarm_data?startTime=${this.StartTime}&endTime=${this.EndTime}`;
      return this.$http.get(api);
    },
    Mirle24AlarmSearch() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_MIRLE24_ALARM_API_URL}/mirle24_alarm_data?startTime=${this.StartTime}&endTime=${this.EndTime}`;
      return this.$http.get(api);
    },
    Lifter22AlarmSearch() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_LIFTER22_ALARM_API_URL}/lifter22_alarm_data?startTime=${this.StartTime}&endTime=${this.EndTime}`;
      return this.$http.get(api);
    },
    GPM22AlarmSearch() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_GPM22_ALARM_API_URL}/gpm22_alarm_data?startTime=${this.StartTime}&endTime=${this.EndTime}`;
      return this.$http.get(api);
    },
    GPM7AlarmSearch() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_GPM7_ALARM_API_URL}/gpm7_alarm_data?startTime=${this.StartTime}&endTime=${this.EndTime}`;
      return this.$http.get(api);
    },
    RDHS24AlarmSearch() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_RDHS24_ALARM_API_URL}/rdhs24_alarm_data?startTime=${this.StartTime}&endTime=${this.EndTime}`;
      return this.$http.get(api);
    },
    Yesterday() {
      let beforeDate = new Date(new Date().getTime() - 16 * 60 * 60 * 1000).toISOString();
      let nowDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
      this.StartTimeS = `${beforeDate.substring(0, 10)} 07:30`;
      this.EndTimeS = `${nowDate.substring(0, 10)} 07:30`;
      this.toDay = `${nowDate.substring(0, 10)}`;
      beforeDate = beforeDate.substring(0, 10).replace('-', '').replace('-', '');
      nowDate = nowDate.substring(0, 10).replace('-', '').replace('-', '');
      this.StartTime = `${beforeDate}0730`;
      this.EndTime = `${nowDate}0730`;
    },
  },
  mounted() {
    this.Yesterday();
    this.AllAlarmSearch();
  },
};
</script>

<style scoped>
td {
  white-space: pre-wrap;
  word-wrap:break-word;
}
</style>
