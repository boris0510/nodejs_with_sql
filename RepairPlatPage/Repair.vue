<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <Loading :active="isLoading" />
  <div class="Repair">
    <div class="mt-2">
      <h4 class="fw-bold">報修平台</h4>
      <div class="d-flex align-items-center mb-3">
        <span class="fw-bold">報修單查詢：</span>
        <label for="searchStartTime">
          <input
            type="datetime-local"
            name="time"
            id="searchStartTime"
            v-model="historyStartTime"
          />
        </label>
        ~
        <label for="searchEndTime">
          <input
            type="datetime-local"
            name="time"
            id="searchEndTime"
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
          報修單查詢
        </button>
        <span class="fw-bold">報修單號查詢：</span>
        <input type="text" v-model="number" />
        <button
          class="btn btn-primary btn-sm ms-2"
          @click="numberSearch('查詢')"
        >
          報修單號查詢
        </button>
      </div>
      <div class="d-flex align-items-center mb-3">
        <span class="fw-bold">開立報修單：</span>
        <button
          class="btn btn-primary btn-sm"
          type="button"
          @click="
            historySearchBool = false;
            boxShow = true;
            historyData = [];
          "
        >
          新增空白報修單
        </button>
      </div>
      <hr />
      <div class="collapse" id="collapseExample" :class="{ show: boxShow }">
        <div class="container border rounded my-4 py-4 px-3">
          <h4 class="fw-bold">開立報修單：</h4>
          <div class="row mt-4">
            <div class="col-4">
              <div class="input-group">
                <label class="input-group-text fw-bold">狀態</label>
                <select class="form-select" v-model="data.state">
                  <option selected disabled>狀態</option>
                  <option value="issue">issue</option>
                  <option value="clarify" disabled>clarify</option>
                  <option value="ameliorate" disabled>ameliorate</option>
                  <option value="provide" disabled>provide</option>
                  <option value="close" disabled>close</option>
                </select>
              </div>
              <span class="text-danger fw-bold" v-if="data.state === ''"
                >*狀態必填</span
              >
            </div>
            <div class="col-4">
              <div class="input-group">
                <span class="input-group-text fw-bold">發生時間</span>
                <label for="startTime">
                  <input
                    type="datetime-local"
                    class="form-control rounded-0 rounded-end"
                    name="time"
                    v-model="data.startTime"
                    @change="useTime()"
                  />
                </label>
              </div>
              <span class="text-danger fw-bold" v-if="data.startTime === ''"
                >*發生時間必填</span
              >
            </div>
            <div class="col-4">
              <div class="input-group">
                <span class="input-group-text fw-bold">結束時間</span>
                <label for="endTime">
                  <input
                    type="datetime-local"
                    class="form-control rounded-0 rounded-end"
                    name="time"
                    v-model="data.endTime"
                    @change="useTime()"
                  />
                </label>
              </div>
              <span class="text-danger fw-bold" v-if="data.endTime === ''"
                >*結束時間必填</span
              >
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-4">
              <div class="input-group">
                <span class="input-group-text fw-bold">處裡時間(分)</span>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Username"
                  v-model="data.useTime"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="input-group">
                <span class="input-group-text fw-bold">機台</span>
                <input
                  class="form-control rounded-end"
                  list="machineDatalist"
                  placeholder="輸入機台"
                  v-model="data.machine"
                  @change="data.machine = data.machine.replaceAll('-', '_')"
                />
                <datalist id="machineDatalist">
                  <option
                    :value="item.MACH_ID"
                    v-for="item in machineData"
                    :key="item.EQP_NAME"
                  >
                    {{ item.MACH_ID }}
                  </option>
                </datalist>
              </div>
              <span class="text-danger fw-bold" v-if="data.machine === ''"
                >*機台必填</span
              >
            </div>
            <div class="col-4">
              <div class="input-group">
                <span class="input-group-text fw-bold">LotID</span>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Username"
                  v-model="data.lotID"
                />
              </div>
              <span class="text-danger fw-bold" v-if="data.lotID === ''"
                >*LotID選填，無則NA</span
              >
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-4">
              <div class="input-group">
                <label class="input-group-text fw-bold">大分類</label>
                <select
                  class="form-select"
                  v-model="data.first_code"
                  @change="filterSecondData"
                >
                  <option selected disabled>大分類</option>
                  <option
                    :value="item.first_code"
                    v-for="item in firstData"
                    :key="item.first_code"
                  >
                    {{ item.first_item }}
                  </option>
                </select>
              </div>
              <span class="text-danger fw-bold" v-if="data.first_code === ''"
                >*大分類必填</span
              >
            </div>
            <div class="col-4">
              <div class="input-group">
                <label class="input-group-text fw-bold">中分類</label>
                <select
                  class="form-select"
                  v-model="data.second_code"
                  :disabled="data.first_code === ''"
                  @change="filterThirdData"
                >
                  <option selected disabled>中分類</option>
                  <option
                    :value="item.second_code"
                    v-for="item in NewSecondData"
                    :key="item.second_code"
                  >
                    {{ item.second_item }}
                  </option>
                </select>
              </div>
              <span class="text-danger fw-bold" v-if="data.second_code === ''"
                >*中分類必填</span
              >
            </div>
            <div class="col-4">
              <div class="input-group">
                <label class="input-group-text fw-bold">小分類</label>
                <select
                  class="form-select"
                  v-model="data.third_code"
                  :disabled="data.second_code === ''"
                  @change="filterClassify"
                >
                  <option selected disabled>小分類</option>
                  <option
                    :value="item.third_code"
                    v-for="item in NewThirdData"
                    :key="item.third_code"
                  >
                    {{ item.third_item }}
                  </option>
                </select>
              </div>
              <span class="text-danger fw-bold" v-if="data.third_code === ''"
                >*小分類必填</span
              >
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-4">
              <div class="input-group">
                <label class="input-group-text fw-bold">班別</label>
                <select class="form-select" v-model="data.shift">
                  <option selected disabled>班別</option>
                  <option value="4A">4A</option>
                  <option value="4B">4B</option>
                  <option value="5A">5A</option>
                  <option value="5B">5B</option>
                </select>
              </div>
              <span class="text-danger fw-bold" v-if="data.shift === ''"
                >*班別必填</span
              >
            </div>
            <div class="col-4">
              <div class="input-group">
                <label class="input-group-text fw-bold">class</label>
                <select class="form-select" v-model="data.class">
                  <option selected disabled>class</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-3">
              <div class="input-group">
                <span class="input-group-text fw-bold">開單人</span>
                <input
                  class="form-control rounded-end"
                  list="usersDatalist"
                  v-model="data.operator"
                />
                <datalist id="usersDatalist">
                  <option
                    :value="item.badge_id"
                    v-for="item in users"
                    :key="item.badge_id"
                  >
                    {{ item.name }} / {{ item.eng_name }}
                  </option>
                </datalist>
              </div>
              <span class="text-danger fw-bold" v-if="data.operator === ''"
                >*開單人必填</span
              >
            </div>
            <div class="col-3">
              <div class="input-group">
                <label class="input-group-text fw-bold">轉單組別</label>
                <select class="form-select" v-model="data.team">
                  <option selected disabled>轉單組別</option>
                  <option value="1000">1000組</option>
                  <option value="2000">2000組</option>
                  <option value="3000">3000組</option>
                  <option value="4000">4000組</option>
                </select>
              </div>
              <span class="text-danger fw-bold" v-if="data.team === ''"
                >*轉單組別必填</span
              >
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <div class="input-group">
                <span class="input-group-text fw-bold">異常敘述</span>
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  rows="3"
                  v-model="data.reason.reason"
                ></textarea>
              </div>
              <span class="text-danger fw-bold" v-if="data.reason.reason === ''"
                >*異常敘述必填</span
              >
              <div class="mt-2">
                <div class="input-group">
                  <input class="form-control form-control-sm" name="file" id="file" type="file" aria-label="file" ref="fileInputReason" @change="fileInput('reason')">
                  <button class="btn btn-primary btn-sm" @click="uploadFile('reason')">上傳</button>
                </div>
                <div class="text-black-50 mb-3" style="font-size: 10pt">
                  檔案名稱請勿重複&emsp;檔案格式支援：ppt、pptx、xls、xlsx、csv、zip、7z、jpg、jpeg、png&emsp;檔案大小限制：30MB
                </div>
                <ul class="list-group">
                  <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item, index) in data.reason.file" :key="index">
                    {{ item.originalname }}&emsp;{{ item.size }}
                    <div class="float-end">
                      <a :href="`${repair_api_url}/downloadFile?folder=${item.folder}&originalname=${item.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                      <button class="btn btn-danger btn-sm" @click="deleteFile('reason', item, index)">刪除</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-6">
              <div class="input-group">
                <span class="input-group-text fw-bold">一線處理</span>
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  rows="3"
                  v-model="data.approach.approach"
                ></textarea>
              </div>
              <span class="text-danger fw-bold" v-if="data.approach.approach === ''"
                >*一線處理必填</span
              >
              <div class="mt-2">
                <div class="input-group">
                  <input class="form-control form-control-sm" name="file" id="file" type="file" aria-label="file" ref="fileInputApproach" @change="fileInput('approach')">
                  <button class="btn btn-primary btn-sm" @click="uploadFile('approach')">上傳</button>
                </div>
                <div class="text-black-50 mb-3" style="font-size: 10pt">
                  檔案名稱請勿重複&emsp;檔案格式支援：ppt、pptx、xls、xlsx、csv、zip、7z、jpg、jpeg、png&emsp;檔案大小限制：30MB
                </div>
                <ul class="list-group">
                  <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item, index) in data.approach.file" :key="index">
                    {{ item.originalname }}&emsp;{{ item.size }}
                    <div class="float-end">
                      <a :href="`${repair_api_url}/downloadFile?folder=${item.folder}&originalname=${item.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                      <button class="btn btn-danger btn-sm" @click="deleteFile('approach', item, index)">刪除</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row d-flex justify-content-end mt-4">
            <div class="col-2">
              <button
                class="btn btn-success btn-sm float-end"
                @click="alarmAdd"
                :disabled="data.reason.reason === '' && data.approach.approach === ''"
              >
                開立報修單
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h4
        class="fw-bold text-primary"
        v-if="historyData.length === 0 && historySearchBool"
      >
        查無報修單資料!
      </h4>
      <div class="table-responsive mt-2" v-if="historyData.length !== 0">
        <h5 class="fw-bold text-primary mt-2">
          查詢結果&emsp;共{{ historyData.length }}筆
        </h5>
        <table class="table table-sm table-striped">
          <thead>
            <tr>
              <th scope="col">單號</th>
              <th scope="col">狀態</th>
              <th scope="col">描述</th>
              <th scope="col">當前處理人</th>
              <th scope="col">開單人</th>
              <th scope="col">轉單組別</th>
              <th scope="col">接單人</th>
              <th scope="col">結單人</th>
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
              <th scope="col">Class</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in historyData" :key="item.number">
              <td>
                <a
                  :href="`#/Admin/RepairProcess/${item.number}`"
                  target="_blank"
                  >{{ item.number }}</a
                >
              </td>
              <td>{{ item.state }}</td>
              <td>{{ item.state_msg }}</td>
              <td>
                <span v-if="item.signer_id === 'taker'">{{ item.taker }}</span>
                <span v-else-if="item.signer_id === 'operator'">{{ item.operator }}</span>
                <span v-else>{{ item.signer_id }}</span>
              </td>
              <td>{{ item.operator }}</td>
              <td>{{ item.team }}組</td>
              <td>{{ item.taker }}</td>
              <td>{{ item.terminator }}</td>
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
              <td>{{ item.class }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      data-bs-dismiss="modal"
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
  name: 'Repair',
  data() {
    return {
      isLoading: false,
      historySearchBool: false,
      alarmAddBtn: false,
      boxShow: false,
      data: {
        state: 'issue',
        startTime: '',
        endTime: '',
        useTime: '',
        machine: '',
        lotID: '',
        first_item: '',
        first_code: '',
        second_item: '',
        second_code: '',
        third_item: '',
        third_code: '',
        alarmCode: '',
        reason: {
          reason: '',
          file: [],
        },
        approach: {
          approach: '',
          file: [],
        },
        shift: '',
        operator: '',
        terminator: '',
        group: '',
        class: 'D',
      },
      historyData: [],
      machineData: [],
      users: [],
      firstData: [],
      secondData: [],
      thirdData: [],
      NewSecondData: [],
      NewThirdData: [],
      file: {},
      number: '',
      historyStartTime: '',
      historyEndTime: '',
      boxModal: '',
      strModal: '',
      repair_api_url: `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}`,
    };
  },
  methods: {
    historySearch(str) {
      if (this.historyStartTime === '' || this.historyEndTime === '') {
        this.strModal = '請填入時間！';
        this.boxModal.show();
        return;
      }
      this.data = {
        state: 'issue',
        startTime: '',
        endTime: '',
        useTime: '',
        machine: '',
        lotID: '',
        first_item: '',
        first_code: '',
        second_item: '',
        second_code: '',
        third_item: '',
        third_code: '',
        alarmCode: '',
        reason: {
          reason: '',
          file: [],
        },
        approach: {
          approach: '',
          file: [],
        },
        shift: '',
        operator: '',
        terminator: '',
        group: '',
        class: 'D',
      };
      this.number = '';
      this.historyData = [];
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/repair_data?startTime=${this.historyStartTime}&endTime=${this.historyEndTime}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.historyData = res.data.data;
            this.historyData.forEach((item) => {
              item.reason = item.reason === null ? { reason: '' } : JSON.parse(item.reason);
              item.approach = item.approach === null ? { approach: '' } : JSON.parse(item.approach);
            });
            this.historySearchBool = true;
            this.strModal = `${str}成功！`;
            this.boxShow = false;
            this.boxModal.show();
            this.isLoading = false;
            console.log('get repair_data success');
          } else {
            this.strModal = '查無此時間報修單！';
            this.boxModal.show();
            this.isLoading = false;
            console.log('get repair_data error');
          }
        })
        .catch((error) => {
          this.strModal = `${str}失敗！`;
          this.boxModal.show();
          this.isLoading = false;
          console.log('get repair_data error');
          console.error(error);
        });
    },
    numberSearch(str) {
      this.data = {
        state: 'issue',
        startTime: '',
        endTime: '',
        useTime: '',
        machine: '',
        lotID: '',
        first_item: '',
        first_code: '',
        second_item: '',
        second_code: '',
        third_item: '',
        third_code: '',
        alarmCode: '',
        reason: {
          reason: '',
          file: [],
        },
        approach: {
          approach: '',
          file: [],
        },
        shift: '',
        operator: '',
        terminator: '',
        group: '',
        class: 'D',
      };
      this.historyData = [];
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/repair_data_number?number=${this.number}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.historyData = res.data.data;
            this.historySearchBool = true;
            this.strModal = `${str}成功！`;
            this.boxShow = false;
            this.boxModal.show();
            this.isLoading = false;
            console.log('get repair_data_number success');
          } else {
            this.strModal = '查無此報修單號！';
            this.boxModal.show();
            this.isLoading = false;
            console.log('get repair_data_number error');
          }
        })
        .catch((error) => {
          this.strModal = `${str}失敗！`;
          this.boxModal.show();
          this.isLoading = false;
          console.log('get repair_data_number error');
          console.error(error);
        });
    },
    alarmAdd() {
      this.historySearchBool = false;
      this.data.reason.reason.replace(/,/g, '，').replace(/"/g, '');
      this.data.approach.approach.replace(/,/g, '，').replace(/"/g, '');
      if (this.data.reason.reason === '' || this.data.approach.approach === '') {
        this.strModal = '請填寫正確！';
        this.boxModal.show();
      } else {
        this.isLoading = true;
        // 單號 - 開單時間
        // const nowDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().substring(0, 16).replaceAll(/-|:|T/g, '');
        // this.data.number = `${nowDate}${
        //   Math.floor(Math.random() * 8999) + 1000
        // }`;
        const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/repair_data`;
        this.$http.post(api, this.data).then((res) => {
          if (res.data.success) {
            this.strModal = '新增成功！';
            this.boxShow = false;
            this.boxModal.show();
            this.isLoading = false;
            this.historySearchBool = false;
            this.data = {
              state: 'issue',
              startTime: '',
              endTime: '',
              useTime: '',
              machine: '',
              lotID: '',
              first_item: '',
              first_code: '',
              second_item: '',
              second_code: '',
              third_item: '',
              third_code: '',
              alarmCode: '',
              reason: {
                reason: '',
                file: [],
              },
              approach: {
                approach: '',
                file: [],
              },
              shift: '',
              operator: '',
              terminator: '',
              group: '',
              class: 'D',
            };
            console.log('post repair_data success');
          } else {
            this.strModal = '新增失敗！';
            this.boxModal.show();
            this.isLoading = false;
            console.log('post repair_data error');
          }
        });
      }
    },
    fileInput(source) {
      if (source === 'reason') {
        this.file = this.$refs.fileInputReason.files[0];
      } else if (source === 'approach') {
        this.file = this.$refs.fileInputApproach.files[0];
      }
      const isLtSize = (this.file.size / 1024 / 1024) < 30;
      if (/\.(ppt|pptx|xls|xlsx|csv|zip|7z|jpg|jpeg|png)$/g.test(this.file.name) === false) {
        this.strModal = '檔案格式錯誤！';
        this.boxModal.show();
        this.file = {};
      }
      if (!isLtSize) {
        this.strModal = '檔案超過30MB！';
        this.boxModal.show();
        this.file = {};
      }
      if (/&|\+|%|#/g.test(this.file.name)) {
        this.strModal = '檔名錯誤 含有\'&\' \'+\' \'%\' \'#\'字元 請修正！';
        this.boxModal.show();
        this.file = {};
      }
    },
    uploadFile(source) {
      if (this.file.name === undefined) {
        this.strModal = '請選擇檔案！';
        this.boxModal.show();
        return;
      }
      this.isLoading = true;
      const formData = new FormData();
      formData.append('file', this.file);
      const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/uploadFile?number=${this.data.number}`;
      this.$http.post(api, formData)
        .then((response) => {
          if (response.data.success) {
            if (source === 'reason') {
              this.data.reason.file.push(response.data.file);
              this.$refs.fileInputReason.value = '';
            } else if (source === 'approach') {
              this.data.approach.file.push(response.data.file);
              this.$refs.fileInputApproach.value = '';
            }
            this.file = {};
            this.strModal = '上傳檔案成功！';
            this.boxModal.show();
            this.isLoading = false;
          } else {
            this.strModal = '上傳檔案失敗！';
            this.boxModal.show();
            this.isLoading = false;
          }
        }).catch((error) => {
          console.log(error);
          this.strModal = '上傳檔案失敗！';
          this.boxModal.show();
          this.isLoading = false;
        });
    },
    deleteFile(source, item, index) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/deleteFile`;
      this.$http.post(api, item)
        .then((response) => {
          if (response.data.success) {
            if (source === 'reason') {
              this.data.reason.file.splice(index, 1);
            } else if (source === 'approach') {
              this.data.approach.file.splice(index, 1);
            }
            this.strModal = '刪除檔案成功！';
            this.boxModal.show();
            this.isLoading = false;
          } else {
            this.strModal = '刪除檔案失敗！';
            this.boxModal.show();
            this.isLoading = false;
          }
        }).catch((error) => {
          console.log(error);
          this.strModal = '刪除檔案失敗！';
          this.boxModal.show();
          this.isLoading = false;
        });
    },
    getEQPName() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_AUTOMATION_API_URL}/eqp_name`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            const newData = res.data.data;
            newData.forEach((item) => {
              const sd = item.MACH_ID.split('_');
              if (sd[0].length === 3) {
                sd[0] = sd[0].substring(0, 2);
              }
              let newS = '';
              sd.forEach((item2) => {
                newS += `${item2}_`;
              });
              newS = newS.substring(0, newS.length - 1);
              item.MACH_ID = newS;
            });
            this.machineData = newData;
            console.log('get eqp_name success');
          } else {
            console.log('get eqp_name error');
          }
        })
        .catch((error) => {
          console.log('get eqp_name error');
          console.error(error);
        });
    },
    getUsers() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/users`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.users = res.data.data;
            console.log('get users success');
          } else {
            console.log('get users error');
          }
        })
        .catch((error) => {
          console.log('get users error');
          console.error(error);
        });
    },
    getFirstData() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_AUTOMATION_API_URL}/automation_classify_first`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.firstData = res.data.data;
            console.log('get firstData success');
          } else {
            console.log('get firstData error');
          }
        })
        .catch((error) => {
          console.log('get firstData error');
          console.error(error);
        });
    },
    getSecondData() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_AUTOMATION_API_URL}/automation_classify_second`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.secondData = res.data.data;
            console.log('get secondData success');
          } else {
            console.log('get secondData error');
          }
        })
        .catch((error) => {
          console.log('get secondData error');
          console.error(error);
        });
    },
    getThirdData() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_AUTOMATION_API_URL}/automation_classify_third`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.thirdData = res.data.data;
            console.log('get thirdData success');
          } else {
            console.log('get thirdData error');
          }
        })
        .catch((error) => {
          console.log('get thirdData error');
          console.error(error);
        });
    },
    filterSecondData() {
      this.NewSecondData = [];
      this.secondData.forEach((item) => {
        if (item.first_code === this.data.first_code) {
          this.NewSecondData.push(item);
        }
      });
    },
    filterThirdData() {
      this.NewThirdData = [];
      this.thirdData.forEach((item) => {
        if (item.second_code === this.data.second_code) {
          this.NewThirdData.push(item);
        }
      });
    },
    filterClassify() {
      this.firstData.forEach((item) => {
        if (this.data.first_code === item.first_code) {
          this.data.first_item = item.first_item;
        }
      });
      this.secondData.forEach((item) => {
        if (this.data.second_code === item.second_code) {
          this.data.second_item = item.second_item;
        }
      });
      this.thirdData.forEach((item) => {
        if (this.data.third_code === item.third_code) {
          this.data.third_item = item.third_item;
        }
      });
    },
    useTime() {
      const startTimeS = new Date(this.data.startTime);
      const endTimeS = new Date(this.data.endTime);
      this.data.useTime = parseInt((endTimeS - startTimeS) / 60000, 10);
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
  watch: {
    'data.state': function state(val) {
      if (val === 'issue') {
        this.data.operator = localStorage.getItem('loginUser');
        this.data.terminator = '';
      }
    },
    boxShow(val) {
      if (val === true) {
        const nowDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().substring(0, 16).replaceAll(/-|:|T/g, '');
        this.data.number = `${nowDate}${Math.floor(Math.random() * 8999) + 1000}`;
      } else {
        this.data.number = '';
      }
    },
  },
  mounted() {
    this.getEQPName();
    this.getUsers();
    this.getFirstData();
    this.getSecondData();
    this.getThirdData();
    this.boxModal = new Modal(this.$refs.boxModal);
  },
};
</script>

<style scoped>
td {
  white-space: pre-wrap;
  word-wrap: break-word;
}
a {
  text-decoration:none;
}
</style>
