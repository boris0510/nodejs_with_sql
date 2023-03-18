<template>
  <Loading :active="isLoading" />
  <div class="GPM7Alarm">
    <div class="mt-2">
      <h4 class="fw-bold">K7GPM異常紀錄</h4>
      <div class="d-flex align-items-center mb-3">
        <span class="fw-bold">異常查詢：</span>
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
        <button class="btn btn-info btn-sm ms-2 me-2" @click="historyMorning">
          早班
        </button>
        <button class="btn btn-dark btn-sm me-2" @click="historyNight">
          晚班
        </button>
        <button
          class="btn btn-outline-secondary btn-sm me-2"
          @click="historyYesterday"
        >
          昨日
        </button>
        <button
          class="btn btn-primary btn-sm me-2"
          @click="historySearch('查詢')"
        >
          異常查詢
        </button>
        <button class="btn btn-warning btn-sm me-2" @click="historyRevise">
          異常修改
        </button>
        <button class="btn btn-danger btn-sm me-2" @click="historyDelete">
          異常刪除
        </button>
      </div>
      <div class="d-flex align-items-center mb-3">
        <span class="fw-bold">異常新增：</span>
        <label for="startTime">
          <input
            type="datetime-local"
            name="time"
            id="startTime"
            v-model="startTime"
          />
        </label>
        ~
        <label for="endTime">
          <input
            type="datetime-local"
            name="time"
            id="endTime"
            v-model="endTime"
          />
        </label>
        <button class="btn btn-info btn-sm ms-2 me-2" @click="morning">
          早班
        </button>
        <button class="btn btn-dark btn-sm me-2" @click="night">晚班</button>
        <button class="btn btn-primary btn-sm me-2" @click="search">
          當班異常查詢
        </button>
        <button class="btn btn-secondary btn-sm me-2" @click="manualAddBtn">
          新增空白欄位
        </button>
        <button class="btn btn-success btn-sm" @click="alarmAdd">
          異常新增
        </button>
      </div>
      <hr />
      <h4
        class="fw-bold text-primary"
        v-if="data.length === 0 && dataSearchBool"
      >
        查無異常資料!
      </h4>
      <h4
        class="fw-bold text-primary"
        v-if="historyData.length === 0 && historySearchBool"
      >
        查無異常資料!
      </h4>
      <div class="table-responsive mt-3" v-if="data.length !== 0">
        <h5 class="fw-bold text-primary mt-1">
          當班異常&emsp;共{{ data.length }}筆
        </h5>
        <table class="table">
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
            <tr
              v-for="(item, index) in data"
              :key="index"
              :class="{ 'table-primary': item.check === true }"
            >
              <td>
                <label :for="index">
                  <input
                    type="checkbox"
                    name="checkbox"
                    :id="index"
                    v-model="item.check"
                    :disabled="item.Added"
                  />
                </label>
              </td>
              <td>
                <label for="year">
                  <input
                    type="text"
                    name="year"
                    id="year"
                    v-model="item.year"
                    size="4"
                    placeholder="2023"
                  />
                </label>
              </td>
              <td>
                <label for="date">
                  <input
                    type="text"
                    name="date"
                    id="date"
                    v-model="item.date"
                    size="4"
                    placeholder="0101"
                  />
                </label>
              </td>
              <td>
                <label for="startTime">
                  <input
                    type="text"
                    name="startTime"
                    id="startTime"
                    v-model="item.startTime"
                    size="6"
                    placeholder="00:00"
                    @change="useTime(index, 'data')"
                  />
                </label>
              </td>
              <td>
                <label for="endTime">
                  <input
                    type="text"
                    name="endTime"
                    id="endTime"
                    v-model="item.endTime"
                    size="6"
                    placeholder="00:05"
                    @change="useTime(index, 'data')"
                  />
                </label>
              </td>
              <td>
                <label for="useTime">
                  <input
                    type="text"
                    name="useTime"
                    id="useTime"
                    v-model="item.useTime"
                    size="8"
                    placeholder="5"
                  />
                </label>
              </td>
              <td>
                <label for="machine">
                  <input
                    type="text"
                    name="machine"
                    id="machine"
                    v-model="item.machine"
                    size="6"
                    placeholder="AGV"
                  />
                </label>
              </td>
              <td>
                <label for="machineNumber">
                  <input
                    type="text"
                    name="machineNumber"
                    id="machineNumber"
                    v-model="item.machineNumber"
                    size="6"
                    placeholder="01,02"
                  />
                </label>
              </td>
              <td>
                <label for="carrierID">
                  <input
                    type="text"
                    name="carrierID"
                    id="carrierID"
                    v-model="item.carrierID"
                    size="10"
                    placeholder="12OC,NA"
                  />
                </label>
              </td>
              <td>
                <label for="alarmCode">
                  <input
                    type="text"
                    name="alarmCode"
                    id="alarmCode"
                    v-model="item.alarmCode"
                    size="8"
                  />
                </label>
              </td>
              <td>
                <label for="reason">
                  <textarea
                    name="reason"
                    id="reason"
                    cols="35"
                    rows="4"
                    v-model="item.reason"
                    placeholder="請確實填寫"
                  ></textarea>
                </label>
              </td>
              <td>
                <label for="approach">
                  <textarea
                    name="approach"
                    id="approach"
                    cols="35"
                    rows="4"
                    v-model="item.approach"
                    placeholder="請確實填寫"
                  ></textarea>
                </label>
              </td>
              <td>
                <label for="remark">
                  <textarea
                    name="remark"
                    id="remark"
                    cols="9"
                    rows="4"
                    v-model="item.remark"
                    placeholder="備註"
                  ></textarea>
                </label>
              </td>
              <td>
                <label for="shift">
                  <select name="shift" id="shift" v-model="item.shift">
                    <option value="4A">4A</option>
                    <option value="4B">4B</option>
                    <option value="5A">5A</option>
                    <option value="5B">5B</option>
                  </select>
                </label>
              </td>
              <td>
                <label for="personnel">
                  <textarea
                    name="personnel"
                    id="personnel"
                    cols="7"
                    rows="4"
                    v-model="item.personnel"
                    placeholder="處理人員"
                  ></textarea>
                </label>
              </td>
              <td>
                <label for="class">
                  <input
                    type="text"
                    name="class"
                    id="class"
                    v-model="item.class"
                    size="3"
                    placeholder="D"
                  />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-responsive mt-2" v-if="historyData.length !== 0">
        <hr />
        <h5 class="fw-bold text-primary mt-2">
          查詢結果&emsp;共{{ historyData.length }}筆
        </h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                <label for="all">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="all"
                    @click="checkAll"
                    ref="all"
                  />
                </label>
              </th>
              <th scope="col">年</th>
              <th scope="col">日期</th>
              <th scope="col">發生時間</th>
              <th scope="col">結束時間</th>
              <th scope="col">處理時間(分)</th>
              <th scope="col">機台分類</th>
              <th scope="col">機台號碼</th>
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
            <tr
              v-for="(item, index) in historyData"
              :key="index"
              :class="{ 'table-primary': item.check === true }"
            >
              <td>
                <label :for="index">
                  <input
                    type="checkbox"
                    name="checkbox"
                    :id="index"
                    v-model="item.check"
                  />
                </label>
              </td>
              <td>
                <label for="year">
                  <input
                    type="text"
                    name="year"
                    id="year"
                    v-model="item.year"
                    size="4"
                    placeholder="2023"
                  />
                </label>
              </td>
              <td>
                <label for="date">
                  <input
                    type="text"
                    name="date"
                    id="date"
                    v-model="item.date"
                    size="4"
                    placeholder="0101"
                  />
                </label>
              </td>
              <td>
                <label for="startTime">
                  <input
                    type="text"
                    name="startTime"
                    id="startTime"
                    v-model="item.startTime"
                    size="6"
                    placeholder="00:00"
                    @change="useTime(index, 'historyData')"
                  />
                </label>
              </td>
              <td>
                <label for="endTime">
                  <input
                    type="text"
                    name="endTime"
                    id="endTime"
                    v-model="item.endTime"
                    size="6"
                    placeholder="00:05"
                    @change="useTime(index, 'historyData')"
                  />
                </label>
              </td>
              <td>
                <label for="useTime">
                  <input
                    type="text"
                    name="useTime"
                    id="useTime"
                    v-model="item.useTime"
                    size="8"
                    placeholder="5"
                  />
                </label>
              </td>
              <td>
                <label for="machine">
                  <input
                    type="text"
                    name="machine"
                    id="machine"
                    v-model="item.machine"
                    size="6"
                    placeholder="AGV"
                  />
                </label>
              </td>
              <td>
                <label for="machineNumber">
                  <input
                    type="text"
                    name="machineNumber"
                    id="machineNumber"
                    v-model="item.machineNumber"
                    size="6"
                    placeholder="01,02"
                  />
                </label>
              </td>
              <td>
                <label for="carrierID">
                  <input
                    type="text"
                    name="carrierID"
                    id="carrierID"
                    v-model="item.carrierID"
                    size="10"
                    placeholder="12OC,NA"
                  />
                </label>
              </td>
              <td>
                <label for="alarmCode">
                  <input
                    type="text"
                    name="alarmCode"
                    id="alarmCode"
                    v-model="item.alarmCode"
                    size="8"
                  />
                </label>
              </td>
              <td>
                <label for="reason">
                  <textarea
                    name="reason"
                    id="reason"
                    cols="35"
                    rows="4"
                    v-model="item.reason"
                    placeholder="請確實填寫"
                  ></textarea>
                </label>
              </td>
              <td>
                <label for="approach">
                  <textarea
                    name="approach"
                    id="approach"
                    cols="35"
                    rows="4"
                    v-model="item.approach"
                    placeholder="請確實填寫"
                  ></textarea>
                </label>
              </td>
              <td>
                <label for="remark">
                  <textarea
                    name="remark"
                    id="remark"
                    cols="9"
                    rows="4"
                    v-model="item.remark"
                    placeholder="備註"
                  ></textarea>
                </label>
              </td>
              <td>
                <label for="shift">
                  <select name="shift" id="shift" v-model="item.shift">
                    <option value="4A">4A</option>
                    <option value="4B">4B</option>
                    <option value="5A">5A</option>
                    <option value="5B">5B</option>
                  </select>
                </label>
              </td>
              <td>
                <label for="personnel">
                  <textarea
                    name="personnel"
                    id="personnel"
                    cols="7"
                    rows="4"
                    v-model="item.personnel"
                    placeholder="處理人員"
                  ></textarea>
                </label>
              </td>
              <td>
                <label for="class">
                  <input
                    type="text"
                    name="class"
                    id="class"
                    v-model="item.class"
                    size="3"
                    placeholder="D"
                  />
                </label>
              </td>
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
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  name: 'GPM7Alarm',
  data() {
    return {
      isLoading: false,
      dataSearchBool: false,
      historySearchBool: false,
      data: [],
      historyData: [],
      alarmCodeData: [],
      alarmCode: '',
      startTime: '',
      endTime: '',
      historyStartTime: '',
      historyEndTime: '',
      boxModal: '',
      strModal: '',
    };
  },
  methods: {
    search() {
      if (this.startTime === '' || this.endTime === '') {
        this.strModal = '請填入時間！';
        this.boxModal.show();
        return;
      }
      this.historyData = [];
      this.alarmCodeData = [];
      this.historySearchBool = false;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_GPM7_ALARM_API_URL}/gpm7_alarm?startTime=${this.startTime}&endTime=${this.endTime}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.data = [];
            res.data.data.forEach((item) => {
              const machineTemp = item.MACHINE;
              const machineNumberTemp = item.MACHINENUMBER;
              // const locationIDTemp = item.LOCATION;
              // const alarmTypeTemp = item.ALARM_TYPE;
              const alarmCodeTemp = item.ALARM_ID;
              const alarmMessageTemp = item.ALARM_MESSAGE;
              const sTimeTemp = item.SET_TIME;
              const eTimeTemp = item.RESET_TIME;
              const yearTemp = sTimeTemp.substring(0, 4);
              const dateTemp = sTimeTemp.substring(4, 8);
              let carrierIDTemp = item.CARRIER_ID;
              //
              const startTimeTemp = `${sTimeTemp.substring(
                8,
                10,
              )}:${sTimeTemp.substring(10, 12)}`;
              const endTimeTemp = `${eTimeTemp.substring(
                8,
                10,
              )}:${eTimeTemp.substring(10, 12)}`;
              let useTimeTemp;
              if (endTimeTemp.substring(0, 2) < startTimeTemp.substring(0, 2)) {
                useTimeTemp = endTimeTemp.substring(0, 2) * 60 + endTimeTemp.substring(3, 5) * 1 + (1440 - (startTimeTemp.substring(0, 2) * 60 + startTimeTemp.substring(3, 5) * 1));
              } else {
                useTimeTemp = endTimeTemp.substring(0, 2) * 60 + endTimeTemp.substring(3, 5) * 1 - (startTimeTemp.substring(0, 2) * 60 + startTimeTemp.substring(3, 5) * 1);
              }
              if (useTimeTemp <= 0) {
                useTimeTemp = 1;
              }
              if (carrierIDTemp === '') {
                carrierIDTemp = 'NA';
              }
              //
              const newData = {
                year: yearTemp,
                date: dateTemp,
                startTime: startTimeTemp,
                endTime: endTimeTemp,
                useTime: useTimeTemp,
                machine: machineTemp,
                machineNumber: machineNumberTemp,
                carrierID: carrierIDTemp,
                alarmCode: alarmCodeTemp,
                reason: alarmMessageTemp,
                approach: '',
                remark: '',
                shift: '',
                personnel: '',
                class: 'D',
              };
              this.data.push(newData);
            });
            // 判斷重複異常
            // 過濾同一筆一分鐘異常
            // const result = [];
            // this.data.forEach((item) => {
            //   if (result.length > 0) {
            //     if (item.alarmCode !== result[result.length - 1].alarmCode) {
            //       result.push(item);
            //     } else if (item.useTime !== 1) {
            //       result.push(item);
            //     }
            //   } else {
            //     result.push(item);
            //   }
            // });
            // this.data = result;
            // searchAlarmCode
            this.data.forEach((item, index) => {
              this.searchAlarmCode(item.alarmCode, index);
            });
            // searchAdded
            this.data.forEach((item, index) => {
              this.searchAdded(
                `${item.year}${item.date}${item.startTime.replace(':', '')}`,
                index,
              );
            });
            this.dataSearchBool = true;
            this.strModal = '查詢成功！';
            this.boxModal.show();
            this.isLoading = false;
            console.log('get gpm7_alarm success');
          } else {
            this.strModal = '查詢失敗！';
            this.boxModal.show();
            this.isLoading = false;
            console.log('get gpm7_alarm error');
          }
        })
        .catch((error) => {
          this.strModal = '查詢失敗！';
          this.boxModal.show();
          this.isLoading = false;
          console.error(error);
        });
    },
    searchAlarmCode(alarmCode, index) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_GPM7_ALARM_API_URL}/gpm7_alarm_alarmcode?alarmCode=${alarmCode}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.alarmCodeData = res.data.data[0];
            if (this.alarmCodeData !== undefined) {
              // this.data[index].reason = this.alarmCodeData.reason;
              this.data[index].approach = this.alarmCodeData.approach;
              this.isLoading = false;
              console.log('get gpm7_alarm_alarmcode success');
            } else {
              this.isLoading = false;
            }
          } else {
            this.isLoading = false;
            console.log('get gpm7_alarm_alarmcode error');
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    searchAdded(startTimeString, index) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_GPM7_ALARM_API_URL}/gpm7_alarm_startTimeString?startTimeString=${startTimeString}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            const temp = res.data.data[0];
            if (temp !== undefined) {
              this.data[index].Added = true;
              this.data[index].reason = temp.reason;
              this.data[index].approach = temp.approach;
              this.data[index].shift = temp.shift;
              this.data[index].personnel = temp.personnel;
              this.isLoading = false;
              console.log('get gpm7_alarm_startTimeString success');
            } else {
              this.isLoading = false;
            }
          } else {
            this.isLoading = false;
            console.log('get gpm7_alarm_startTimeString error');
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    historySearch(str) {
      if (this.historyStartTime === '' || this.historyEndTime === '') {
        this.strModal = '請填入時間！';
        this.boxModal.show();
        return;
      }
      this.data = [];
      this.alarmCodeData = [];
      this.dataSearchBool = false;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_GPM7_ALARM_API_URL}/gpm7_alarm_data?startTime=${this.historyStartTime}&endTime=${this.historyEndTime}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.historyData = res.data.data;
            this.historySearchBool = true;
            this.strModal = `${str}成功！`;
            this.boxModal.show();
            this.isLoading = false;
            console.log('get gpm7_alarm_data success');
          } else {
            this.strModal = '查無此時間異常！';
            this.boxModal.show();
            this.isLoading = false;
            console.log('get gpm7_alarm_data error');
          }
        })
        .catch((error) => {
          this.strModal = `${str}失敗！`;
          this.boxModal.show();
          this.isLoading = false;
          console.error(error);
        });
    },
    historyRevise() {
      this.dataSearchBool = false;
      this.historySearchBool = false;
      const newData = [];
      let checkEmpty = true;
      this.historyData.forEach((item) => {
        if (item.check === true) {
          newData.push(item);
          checkEmpty = false;
        }
      });
      newData.forEach((item, index) => {
        const newReason = item.reason.replace(/,/g, '，').replace(/"/g, '');
        const newApproach = item.approach.replace(/,/g, '，').replace(/"/g, '');
        const newRemark = item.remark.replace(/,/g, '，').replace(/"/g, '');
        const newPersonnel = item.personnel
          .replace(/,/g, '，')
          .replace(/"/g, '');
        newData[index].reason = newReason;
        newData[index].approach = newApproach;
        newData[index].remark = newRemark;
        newData[index].personnel = newPersonnel;
      });
      if (checkEmpty) {
        this.strModal = '請選取要修改的項目！';
        this.boxModal.show();
      } else {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_CIM_ESERVICES_GPM7_ALARM_API_URL}/gpm7_alarm_data`;
        this.$http
          .patch(api, newData)
          .then((res) => {
            if (res.data.success) {
              this.strModal = '修改成功！';
              this.boxModal.show();
              this.historySearch('修改');
              this.$refs.all.checked = false;
              this.isLoading = false;
              console.log('update gpm7_alarm_data success');
            } else {
              this.strModal = '修改失敗！';
              this.boxModal.show();
              this.isLoading = false;
              console.log('update gpm7_alarm_data error');
            }
          })
          .catch((error) => {
            this.strModal = '修改失敗！';
            this.boxModal.show();
            this.isLoading = false;
            console.error(error);
          });
      }
    },
    historyDelete() {
      this.dataSearchBool = false;
      this.historySearchBool = false;
      const newData = [];
      let checkEmpty = true;
      this.historyData.forEach((item) => {
        if (item.check === true) {
          newData.push(item);
          checkEmpty = false;
        }
      });
      if (checkEmpty) {
        this.strModal = '請選取要刪除的項目！';
        this.boxModal.show();
      } else {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_CIM_ESERVICES_GPM7_ALARM_API_URL}/gpm7_alarm_data_delete`;
        this.$http
          .post(api, newData)
          .then((res) => {
            if (res.data.success) {
              this.strModal = '刪除成功！';
              this.boxModal.show();
              this.historySearch('刪除');
              this.isLoading = false;
              console.log('delete gpm7_alarm_data success');
            } else {
              this.strModal = '刪除失敗！';
              this.boxModal.show();
              this.isLoading = false;
              console.log('delete gpm7_alarm_data error');
            }
          })
          .catch((error) => {
            this.strModal = '刪除失敗！';
            this.boxModal.show();
            this.isLoading = false;
            console.error(error);
          });
      }
    },
    alarmAdd() {
      this.dataSearchBool = false;
      this.historySearchBool = false;
      const newData = [];
      let checkEmpty = true;
      let checkPersonnel = false;
      let checkShift = false;
      this.data.forEach((item) => {
        if (item.check === true) {
          newData.push(item);
          if (item.personnel === '') {
            checkPersonnel = true;
          }
          if (item.shift === '') {
            checkShift = true;
          }
          checkEmpty = false;
        }
      });
      newData.forEach((item, index) => {
        const newReason = item.reason.replace(/,/g, '，').replace(/"/g, '');
        const newApproach = item.approach.replace(/,/g, '，').replace(/"/g, '');
        const newRemark = item.remark.replace(/,/g, '，').replace(/"/g, '');
        const newPersonnel = item.personnel
          .replace(/,/g, '，')
          .replace(/"/g, '');
        newData[index].reason = newReason;
        newData[index].approach = newApproach;
        newData[index].remark = newRemark;
        newData[index].personnel = newPersonnel;
      });
      if (checkEmpty) {
        this.strModal = '請選取其中一項！';
        this.boxModal.show();
      } else if (checkPersonnel) {
        this.strModal = '請輸入處理人員！';
        this.boxModal.show();
      } else if (checkShift) {
        this.strModal = '請輸入班別！';
        this.boxModal.show();
      } else {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_CIM_ESERVICES_GPM7_ALARM_API_URL}/gpm7_alarm_data`;
        this.$http.post(api, newData).then((res) => {
          if (res.data.success) {
            this.strModal = '新增成功！';
            this.boxModal.show();
            this.isLoading = false;
            this.data = [];
            this.alarmCodeData = [];
            this.alarmCode = '';
            console.log('post gpm7_alarm_data success');
          } else {
            this.strModal = '新增失敗！';
            this.boxModal.show();
            this.isLoading = false;
            console.log('post gpm7_alarm_data error');
          }
        });
      }
    },
    manualAddBtn() {
      this.dataSearchBool = false;
      this.historySearchBool = false;
      this.data.push({
        year: '',
        date: '',
        startTime: '',
        endTime: '',
        useTime: '',
        machine: '',
        machineNumber: '',
        carrierID: '',
        alarmCode: '',
        reason: '',
        approach: '',
        remark: '',
        shift: '',
        personnel: '',
        class: 'D',
      });
    },
    checkAll() {
      if (this.$refs.all.checked) {
        this.historyData.forEach((item) => {
          item.check = true;
        });
      } else {
        this.historyData.forEach((item) => {
          item.check = false;
        });
      }
    },
    useTime(index, useData) {
      if (this[useData][index].startTime.length !== 0 && this[useData][index].startTime.length < 5) {
        this[useData][index].startTime = `0${this[useData][index].startTime}`;
      }
      if (this[useData][index].endTime.length !== 0 && this[useData][index].endTime.length < 5) {
        this[useData][index].endTime = `0${this[useData][index].endTime}`;
      }
      if (this[useData][index].endTime.substring(0, 2) < this[useData][index].startTime.substring(0, 2)) {
        this[useData][index].useTime = this[useData][index].endTime.substring(0, 2) * 60 + this[useData][index].endTime.substring(3, 5) * 1 + (1440 - (this[useData][index].startTime.substring(0, 2) * 60 + this[useData][index].startTime.substring(3, 5) * 1));
      } else {
        this[useData][index].useTime = this[useData][index].endTime.substring(0, 2) * 60 + this[useData][index].endTime.substring(3, 5) * 1 - (this[useData][index].startTime.substring(0, 2) * 60 + this[useData][index].startTime.substring(3, 5) * 1);
      }
    },
    morning() {
      let date = new Date().toISOString();
      date = date.substring(0, 10);
      this.startTime = `${date}T07:30`;
      this.endTime = `${date}T19:30`;
    },
    night() {
      let beforeDate = new Date(
        new Date().getTime() - 16 * 60 * 60 * 1000,
      ).toISOString();
      let nowDate = new Date(
        new Date().getTime() + 8 * 60 * 60 * 1000,
      ).toISOString();
      let afterDate = new Date(
        new Date().getTime() + 32 * 60 * 60 * 1000,
      ).toISOString();
      beforeDate = beforeDate.substring(0, 10);
      nowDate = nowDate.substring(0, 10);
      afterDate = afterDate.substring(0, 10);
      const hours = new Date().getHours();
      if (hours >= 0 && hours <= 12) {
        this.startTime = `${beforeDate}T19:30`;
        this.endTime = `${nowDate}T07:30`;
      } else {
        this.startTime = `${nowDate}T19:30`;
        this.endTime = `${afterDate}T07:30`;
      }
    },
    historyMorning() {
      let date = new Date().toISOString();
      date = date.substring(0, 10);
      this.historyStartTime = `${date}T07:30`;
      this.historyEndTime = `${date}T19:30`;
    },
    historyNight() {
      let beforeDate = new Date(
        new Date().getTime() - 16 * 60 * 60 * 1000,
      ).toISOString();
      let nowDate = new Date(
        new Date().getTime() + 8 * 60 * 60 * 1000,
      ).toISOString();
      let afterDate = new Date(
        new Date().getTime() + 32 * 60 * 60 * 1000,
      ).toISOString();
      beforeDate = beforeDate.substring(0, 10);
      nowDate = nowDate.substring(0, 10);
      afterDate = afterDate.substring(0, 10);
      const hours = new Date().getHours();
      if (hours >= 0 && hours <= 12) {
        this.historyStartTime = `${beforeDate}T19:30`;
        this.historyEndTime = `${nowDate}T07:30`;
      } else {
        this.historyStartTime = `${nowDate}T19:30`;
        this.historyEndTime = `${afterDate}T07:30`;
      }
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
