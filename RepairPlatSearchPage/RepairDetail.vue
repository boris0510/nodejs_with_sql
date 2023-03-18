<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <Loading :active="isLoading" />
  <div class="RepairDetailPage">
    <div class="mt-2">
      <h4 class="fw-bold">報修單查詢：</h4>
      <hr />
      <div class="container border rounded my-4 py-4 px-3">
        <h4 class="fw-bold d-flex align-items-center">
          報修單單號：{{ data.number
          }}<span class="badge bg-primary fw-bold ms-3">{{
            data.state_msg
          }}</span>
        </h4>
        <div class="row mt-4">
          <div class="col-2">
            <div class="input-group">
              <label class="input-group-text fw-bold">狀態</label>
              <select class="form-select" v-model="data.state" disabled>
                <option selected disabled>狀態</option>
                <option value="issue">issue</option>
                <option value="clarify">clarify</option>
                <option value="ameliorate">ameliorate</option>
                <option value="provide">provide</option>
                <option value="confirm">confirm</option>
                <option value="close">close</option>
              </select>
            </div>
          </div>
          <div class="col-3" v-if="data.signer !== 'NA'">
            <div class="input-group">
              <span class="input-group-text fw-bold">當前處理人</span>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                v-model="data.current_signer_id"
                disabled
              />
            </div>
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-info fw-bold" @click="openSignHistoryModal">查看簽核歷程</button>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-4">
            <div class="input-group">
              <span class="input-group-text fw-bold">發生時間</span>
              <input
                type="datetime-local"
                class="form-control"
                aria-label="time"
                v-model="data.startTime"
                disabled
              />
            </div>
          </div>
          <div class="col-4">
            <div class="input-group">
              <span class="input-group-text fw-bold">結束時間</span>
              <input
                type="datetime-local"
                class="form-control"
                aria-label="time"
                v-model="data.endTime"
                disabled
              />
            </div>
          </div>
          <div class="col-4">
            <div class="input-group">
              <span class="input-group-text fw-bold">due Date</span>
              <input
                type="date"
                class="form-control"
                aria-label="date"
                v-model="data.dueDate"
                disabled
              />
            </div>
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
                disabled
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
                disabled
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
          </div>
          <div class="col-4">
            <div class="input-group">
              <span class="input-group-text fw-bold">LotID</span>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                v-model="data.lotID"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-4">
            <div class="input-group">
              <label class="input-group-text fw-bold">大分類</label>
              <select
                class="form-select"
                v-model="data.first_code"
                disabled
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
          </div>
          <div class="col-4">
            <div class="input-group">
              <label class="input-group-text fw-bold">中分類</label>
              <select
                class="form-select"
                v-model="data.second_code"
                disabled
              >
                <option selected disabled>中分類</option>
                <option
                  :value="item.second_code"
                  v-for="item in secondData"
                  :key="item.second_code"
                  v-show="item.first_code === data.first_code"
                >
                  {{ item.second_item }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="input-group">
              <label class="input-group-text fw-bold">小分類</label>
              <select
                class="form-select"
                v-model="data.third_code"
                disabled
              >
                <option selected disabled>小分類</option>
                <option
                  :value="item.third_code"
                  v-for="item in thirdData"
                  :key="item.third_code"
                  v-show="item.second_code === data.second_code"
                >
                  {{ item.third_item }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-4">
            <div class="input-group">
              <label class="input-group-text fw-bold">班別</label>
              <select class="form-select" v-model="data.shift" disabled>
                <option selected disabled>班別</option>
                <option value="4A">4A</option>
                <option value="4B">4B</option>
                <option value="5A">5A</option>
                <option value="5B">5B</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="input-group">
              <label class="input-group-text fw-bold">class</label>
              <select class="form-select" v-model="data.class" disabled>
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
                type="text"
                class="form-control"
                aria-label="Username"
                placeholder="工號"
                v-model="data.operator"
                disabled
              />
            </div>
          </div>
          <div class="col-3">
            <div class="input-group">
              <span class="input-group-text fw-bold">接單人</span>
              <input
                class="form-control rounded-end"
                list="usersDatalist"
                v-model="data.taker"
                disabled
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
          </div>
          <div class="col-3">
            <div class="input-group">
              <label class="input-group-text fw-bold">轉單組別</label>
              <select class="form-select" v-model="data.team" disabled>
                <option selected disabled>轉單組別</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
                <option value="3000">3000</option>
                <option value="4000">4000</option>
              </select>
            </div>
          </div>
          <div class="col-3">
            <div class="input-group">
              <span class="input-group-text fw-bold">結單人</span>
              <input
                type="text"
                class="form-control"
                aria-label="Username"
                v-model="data.terminator"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="accordion mt-4" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#reason"
              >
                異常狀況敘述
              </button>
            </h2>
            <div id="reason" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <textarea
                  class="form-control mb-3"
                  aria-label="With textarea"
                  rows="3"
                  v-model="data.reason.reason"
                  disabled
                ></textarea>
                <ul class="list-group">
                  <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item, index) in data.reason.file" :key="index">
                    {{ item.originalname }}&emsp;{{ item.size }}
                    <div class="float-end">
                      <a :href="`${repair_api_url}/downloadFile?folder=${item.folder}&originalname=${item.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#approach"
              >
                一線處理敘述
              </button>
            </h2>
            <div id="approach" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <textarea
                  class="form-control mb-3"
                  aria-label="With textarea"
                  rows="3"
                  v-model="data.approach.approach"
                  disabled
                ></textarea>
                <ul class="list-group">
                  <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item, index) in data.approach.file" :key="index">
                    {{ item.originalname }}&emsp;{{ item.size }}
                    <div class="float-end">
                      <a :href="`${repair_api_url}/downloadFile?folder=${item.folder}&originalname=${item.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#root_cause"
              >
                Root cause
              </button>
            </h2>
            <div id="root_cause" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <textarea
                  class="form-control mb-3"
                  aria-label="With textarea"
                  rows="3"
                  v-model="data.root_cause.root_cause"
                  disabled
                ></textarea>
                <ul class="list-group">
                  <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item, index) in data.root_cause.file" :key="index">
                    {{ item.originalname }}&emsp;{{ item.size }}
                    <div class="float-end">
                      <a :href="`${repair_api_url}/downloadFile?folder=${item.folder}&originalname=${item.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ameliorate"
              >
                二線改善項目
              </button>
            </h2>
            <div id="ameliorate" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <div class="table-responsive">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">改善項目</th>
                        <th scope="col">due Date</th>
                        <th scope="col">上傳檔案</th>
                      </tr>
                    </thead>
                    <tbody v-for="(item, index) in data.ameliorate" :key="item">
                      <tr>
                        <td scope="row" width="3%">{{ index + 1}}.</td>
                        <td width="40%">
                          <textarea
                            class="form-control"
                            aria-label="With textarea"
                            rows="2"
                            v-model="item.ameliorate"
                            disabled
                          ></textarea>
                        </td>
                        <td width="10%">
                          <input
                            type="date"
                            class="form-control"
                            aria-label="date"
                            v-model="item.dueDate"
                            disabled
                          />
                        </td>
                        <td width="40%">
                          <ul class="list-group">
                            <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item2, index2) in item.file" :key="index2">
                              {{ item2.originalname }}&emsp;{{ item2.size }}
                              <div class="float-end">
                                <a :href="`${repair_api_url}/downloadFile?folder=${item2.folder}&originalname=${item2.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                              </div>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#provide"
              >
                二線改善成果
              </button>
            </h2>
            <div id="provide" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <div class="table-responsive">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">改善項目</th>
                        <th scope="col">改善敘述</th>
                        <th scope="col">上傳檔案</th>
                      </tr>
                    </thead>
                    <tbody v-for="(item, index) in data.provide" :key="item">
                      <tr>
                        <td scope="row" width="3%">{{ index + 1}}.</td>
                        <td width="30%">
                          <textarea
                            class="form-control"
                            aria-label="With textarea"
                            rows="2"
                            v-model="item.ameliorate"
                            disabled
                          ></textarea>
                        </td>
                        <td width="30%">
                          <textarea
                            class="form-control"
                            aria-label="With textarea"
                            rows="2"
                            v-model="item.provide"
                            disabled
                          ></textarea>
                        </td>
                        <td width="35%">
                          <ul class="list-group">
                            <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item2, index2) in item.file" :key="index2">
                              {{ item2.originalname }}&emsp;{{ item2.size}}
                              <div class="float-end">
                                <a :href="`${repair_api_url}/downloadFile?folder=${item2.folder}&originalname=${item2.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                              </div>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <!-- 簽核歷程 Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      ref="signHistoryModal"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">
              簽核歷程
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col">狀態</th>
                    <th scope="col">時間</th>
                    <th scope="col">工號</th>
                    <th scope="col">動作</th>
                    <th scope="col">原因</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in signHistoryData" :key="index">
                    <td style="width: 300px">{{ item.state }}</td>
                    <td style="width: 300px">{{ item.date }}</td>
                    <td style="width: 300px">{{ item.signer_id }}</td>
                    <td style="width: 300px">{{ item.action }}</td>
                    <td style="width: 800px">{{ item.reason }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
  name: 'RepairDetailPage',
  data() {
    return {
      isLoading: false,
      data: {
        reason: {
          reason: '',
          file: [],
        },
        approach: {
          approach: '',
          file: [],
        },
        root_cause: {
          root_cause: '',
          file: [],
        },
        ameliorate: {},
        provide: {},
      },
      signHistoryData: [],
      machineData: [],
      users: [],
      firstData: [],
      secondData: [],
      thirdData: [],
      loginUser: '',
      boxModal: '',
      signHistoryModal: '',
      strModal: '',
    };
  },
  methods: {
    historySearch() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/repair_data_number?number=${this.$route.params.number}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.data = res.data.data[0];
            this.data.reason = this.data.reason === null ? { reason: '', file: [] } : JSON.parse(this.data.reason);
            this.data.approach = this.data.approach === null ? { approach: '', file: [] } : JSON.parse(this.data.approach);
            this.data.root_cause = this.data.root_cause === null ? { root_cause: '', file: [] } : JSON.parse(this.data.root_cause);
            this.data.ameliorate = this.data.ameliorate === null ? [] : JSON.parse(this.data.ameliorate);
            this.data.provide = this.data.provide === null ? [] : JSON.parse(this.data.provide);
            this.data.modalReason = '';
            if (this.data.signer === 'operator') {
              this.data.current_signer_id = this.data.operator;
            } else if (this.data.signer === 'taker') {
              this.data.current_signer_id = this.data.taker;
            } else {
              this.data.current_signer_id = this.data.signer_id;
            }
            const newUsers = [];
            this.users.forEach((item) => {
              if (item.team === this.data.team) {
                newUsers.push(item);
              }
            });
            this.users = newUsers;
            this.isLoading = false;
            console.log('get repair_data_number success');
          } else {
            this.isLoading = false;
            console.log('get repair_data_number error');
          }
        })
        .catch((error) => {
          this.emitter.emit('message:push', { message: '載入失敗！', status: 'danger' });
          this.isLoading = false;
          console.log('get repair_data_number error');
          console.error(error);
        });
    },
    signHistory() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/repair_signhistory?number=${this.$route.params.number}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.signHistoryData = res.data.data;
            this.isLoading = false;
            console.log('get repair_signhistory success');
          } else {
            this.isLoading = false;
            console.log('get repair_signhistory error');
          }
        })
        .catch((error) => {
          this.emitter.emit('message:push', { message: '載入失敗！', status: 'danger' });
          this.isLoading = false;
          console.log('get repair_signhistory error');
          console.error(error);
        });
    },
    getEQPName() {
      const api = `${process.env.VUE_APP_CIM_ESERVICES_AUTOMATION_API_URL}/eqp_name`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.machineData = res.data.data;
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
    openModal() {
      this.boxModal.show();
    },
    openSignHistoryModal() {
      this.signHistoryModal.show();
    },
  },
  mounted() {
    this.getEQPName();
    this.getUsers();
    this.getFirstData();
    this.getSecondData();
    this.getThirdData();
    this.historySearch();
    this.signHistory();
    this.boxModal = new Modal(this.$refs.boxModal);
    this.signHistoryModal = new Modal(this.$refs.signHistoryModal);
    this.loginUser = localStorage.getItem('loginUser');
  },
};
</script>
