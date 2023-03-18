<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <Loading :active="isLoading" />
  <div class="RepairProcess">
    <div class="mt-2">
      <h4 class="fw-bold">報修平台</h4>
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
                @change="useTime()"
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
                @change="useTime()"
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
                @change="(data.second_code = ''), (data.third_code = '')"
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
                :disabled="data.first_code === ''"
                @change="data.third_code = ''"
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
                :disabled="data.second_code === ''"
                @click="filterClassify"
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
                type="text"
                class="form-control"
                aria-label="Username"
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
                :disabled="data.action !== '轉單'"
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
                <option value="1000">1000組</option>
                <option value="2000">2000組</option>
                <option value="3000">3000組</option>
                <option value="4000">4000組</option>
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
                class="accordion-button fw-bold text-dark"
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
                class="accordion-button fw-bold text-dark"
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
                class="accordion-button fw-bold text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#root_cause"
                :class="{ collapsed: data.state !== 'clarify' && data.state !== 'close' }"
              >
                Root cause
              </button>
            </h2>
            <div id="root_cause" class="accordion-collapse collapse" :class="{ show: data.state === 'clarify' || data.state === 'close' }">
              <div class="accordion-body">
                <textarea
                  class="form-control mb-3"
                  aria-label="With textarea"
                  rows="3"
                  v-model="data.root_cause.root_cause"
                  :disabled= "data.state !== 'clarify' || data.state_number !== 1 || data.taker !== loginUser"
                ></textarea>
                <div v-if="data.state === 'clarify' && data.state_number === 1 && data.taker === loginUser">
                  <div class="input-group">
                    <input class="form-control form-control-sm" name="file" id="file" type="file" aria-label="file" ref="fileInputRootCause" @change="fileInput('root_cause')">
                    <button class="btn btn-primary btn-sm" @click="uploadFile('root_cause')">上傳</button>
                  </div>
                  <div class="text-black-50 mb-3" style="font-size: 10pt">
                    檔案名稱請勿重複&emsp;檔案格式支援：ppt、pptx、xls、xlsx、csv、zip、7z、jpg、jpeg、png&emsp;檔案大小限制：30MB
                  </div>
                </div>
                <ul class="list-group">
                  <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item, index) in data.root_cause.file" :key="index">
                    {{ item.originalname }}&emsp;{{ item.size }}
                    <div class="float-end">
                      <a :href="`${repair_api_url}/downloadFile?folder=${item.folder}&originalname=${item.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                      <button class="btn btn-danger btn-sm" @click="deleteFile('root_cause', 0, item, index)" v-if="data.state === 'clarify' && data.state_number === 1 && data.taker === loginUser">刪除</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button fw-bold text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ameliorate"
                :class="{ collapsed: data.state !== 'ameliorate' && data.state !== 'close' }"
              >
                二線改善項目
              </button>
            </h2>
            <div id="ameliorate" class="accordion-collapse collapse" :class="{ show: data.state === 'ameliorate' || data.state === 'close' }">
              <div class="accordion-body">
                <div class="table-responsive">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th scope="col" v-if= "data.state === 'ameliorate' && data.state_number === 1 && data.taker === loginUser"></th>
                        <th scope="col">#</th>
                        <th scope="col">改善項目</th>
                        <th scope="col">due Date</th>
                        <th scope="col">上傳檔案</th>
                      </tr>
                    </thead>
                    <tbody v-for="(item, index) in data.ameliorate" :key="item">
                      <tr>
                        <td scope="row" width="3%" v-if= "data.state === 'ameliorate' && data.state_number === 1 && data.taker === loginUser"><button type="button" class="btn-close btn-sm" @click="data.ameliorate.splice(index, 1)"></button></td>
                        <td scope="row" width="3%">{{ index + 1}}.</td>
                        <td width="40%">
                          <textarea
                            class="form-control"
                            aria-label="With textarea"
                            rows="2"
                            v-model="item.ameliorate"
                            :disabled= "data.state !== 'ameliorate' || data.state_number !== 1 || data.taker !== loginUser"
                          ></textarea>
                        </td>
                        <td width="10%">
                          <input
                            type="date"
                            class="form-control"
                            aria-label="date"
                            v-model="item.dueDate"
                            :disabled= "data.state !== 'ameliorate' || data.state_number !== 1 || data.taker !== loginUser"
                          />
                        </td>
                        <td width="40%">
                          <div v-if="data.state === 'ameliorate' && data.state_number === 1 && data.taker === loginUser">
                            <div class="input-group">
                              <input class="form-control form-control-sm" name="file" id="file" type="file" aria-label="file" :ref="`fileInputAmeliorate${index}`" @change="fileInput('ameliorate', index)">
                              <button class="btn btn-primary btn-sm" @click="uploadFile('ameliorate', index)">上傳</button>
                            </div>
                            <div class="text-black-50 mb-3" style="font-size: 10pt">
                              檔案名稱請勿重複&emsp;檔案格式支援：ppt、pptx、xls、xlsx、csv、zip、7z、jpg、jpeg、png&emsp;檔案大小限制：30MB
                            </div>
                          </div>
                          <ul class="list-group">
                            <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item2, index2) in item.file" :key="index2">
                              {{ item2.originalname }}&emsp;{{ item2.size }}
                              <div class="float-end">
                                <a :href="`${repair_api_url}/downloadFile?folder=${item2.folder}&originalname=${item2.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                                <button class="btn btn-danger btn-sm" @click="deleteFile('ameliorate', index, item2, index2)" v-if= "data.state === 'ameliorate' && data.state_number === 1 && data.taker === loginUser">刪除</button>
                              </div>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary btn-sm" v-if= "data.state === 'ameliorate' && data.state_number === 1 && data.taker === loginUser" @click="data.ameliorate.push({ ameliorate: '', dueDate: '', file: [] })">新增欄位</button>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button fw-bold text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#provide"
                :class="{ collapsed: data.state !== 'provide' && data.state !== 'close' }"
              >
                二線改善成果
              </button>
            </h2>
            <div id="provide" class="accordion-collapse collapse" :class="{ show: data.state === 'provide' || data.state === 'close' }">
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
                            :disabled= "data.state !== 'provide' || data.taker !== loginUser"
                          ></textarea>
                        </td>
                        <td width="35%">
                          <div v-if="data.state === 'provide' && data.state_number === 1 && data.taker === loginUser">
                            <div class="input-group">
                              <input class="form-control form-control-sm" name="file" id="file" type="file" aria-label="file" :ref="`fileInputProvide${index}`" @change="fileInput('provide', index)">
                              <button class="btn btn-primary btn-sm" @click="uploadFile('provide', index)">上傳</button>
                            </div>
                            <div class="text-black-50 mb-3" style="font-size: 10pt">
                              檔案名稱請勿重複&emsp;檔案格式支援：ppt、pptx、xls、xlsx、csv、zip、7z、jpg、jpeg、png&emsp;檔案大小限制：30MB
                            </div>
                          </div>
                          <ul class="list-group">
                            <li class="list-group-item text-primary d-flex align-items-center justify-content-between" v-for="(item2, index2) in item.file" :key="index2">
                              {{ item2.originalname }}&emsp;{{ item2.size}}
                              <div class="float-end">
                                <a :href="`${repair_api_url}/downloadFile?folder=${item2.folder}&originalname=${item2.originalname}`" class="btn btn-primary btn-sm me-2">下載</a>
                                <button class="btn btn-danger btn-sm" @click="deleteFile('provide', index, item2, index2)" v-if="data.state === 'provide' && data.state_number === 1 && data.taker === loginUser">刪除</button>
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
        <div class="row d-flex justify-content-end mt-4" v-if="data.current_signer_id === loginUser">
          <div class="col-2 d-flex justify-content-end">
            <button
              class="btn btn-danger btn-sm"
              @click="openCloseModal"
              v-if="data.state === 'issue' && data.state_number === 1"
            >
              結單送簽
            </button>
            <button
              class="btn btn-danger btn-sm ms-3"
              @click="openRejectModal"
              v-if="data.action === '簽核'"
            >
              駁回
            </button>
            <button
              class="btn btn-success btn-sm ms-3"
              @click="openSignModal"
              v-if="data.action === '轉單'"
            >
              轉單給工程師
            </button>
            <button
              class="btn btn-success btn-sm ms-3"
              @click="openSignModal"
              v-if="data.action === '接單'"
            >
              接單
            </button>
            <button
              class="btn btn-success btn-sm ms-3"
              @click="openSignModal"
              v-if="data.action === '簽核'"
            >
              簽核
            </button>
            <button
              class="btn btn-success btn-sm ms-3"
              @click="openSignModal"
              v-if="data.action === '送簽'"
            >
              送簽
            </button>
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
    <!-- 簽核 Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      ref="signModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">
              確定是否{{ data.action }}?
            </h5>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-success btn-sm"
              data-bs-dismiss="modal"
              @click="sendSignCheck"
            >
              {{ data.action }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 駁回 Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      ref="rejectModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">
              確定是否駁回?
            </h5>
          </div>
          <div class="modal-body">
            <textarea
              class="form-control"
              aria-label="With textarea"
              rows="5"
              v-model="data.modalReason"
              placeholder="請填寫原因"
            ></textarea>
            <span class="text-danger fw-bold" v-if="data.modalReason === ''"
              >*原因必填</span
            >
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              data-bs-dismiss="modal"
              @click="sendReject"
              :disabled="data.modalReason === ''"
            >
              駁回
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 結單 Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      ref="closeModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">
              請填寫結單原因
            </h5>
          </div>
          <div class="modal-body">
            <textarea
              class="form-control"
              aria-label="With textarea"
              rows="5"
              v-model="data.modalReason"
              placeholder="請填寫原因"
            ></textarea>
            <span class="text-danger fw-bold" v-if="data.modalReason === ''"
              >*原因必填</span
            >
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-success btn-sm"
              data-bs-dismiss="modal"
              @click="closeSign"
              :disabled="data.modalReason === ''"
            >
              送簽
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
  name: 'RepairProcess',
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
      file: {},
      loginUser: '',
      signModal: '',
      rejectModal: '',
      closeModal: '',
      boxModal: '',
      signHistoryModal: '',
      strModal: '',
      repair_api_url: `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}`,
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
    closeSign() {
      this.data.currentState = this.data.state;
      this.data.state = 'confirm';
      this.data.state_number = '1';
      this.data.terminator = this.data.signer_id;
      this.data.taker = 'NA';
      this.data.root_cause = 'NA';
      this.data.ameliorate = 'NA';
      this.data.provide = 'NA';
      this.updateSendSign('結單送簽');
    },
    sendSignCheck() {
      if (this.data.state === 'issue' && this.data.state_number === 1) {
        let isEmpty = false;
        if (this.data.taker === '') {
          isEmpty = true;
        }
        if (isEmpty) {
          this.emitter.emit('message:push', { message: '請填寫接單人！', status: 'danger' });
        } else {
          this.sendSign();
        }
      } else if (this.data.state === 'clarify' && this.data.state_number === 1) {
        let isEmpty = false;
        if (this.data.root_cause.root_cause === '') {
          isEmpty = true;
        }
        if (isEmpty) {
          this.emitter.emit('message:push', { message: '請填寫Root cause！', status: 'danger' });
        } else {
          this.sendSign();
        }
      } else if (this.data.state === 'ameliorate' && this.data.state_number === 1) {
        if (this.data.ameliorate.length === 0) {
          this.emitter.emit('message:push', { message: '請填寫二線改善項目！', status: 'danger' });
        } else {
          let isEmpty = false;
          this.data.ameliorate.forEach((item) => {
            if (item.ameliorate === '') {
              isEmpty = true;
            }
          });
          if (isEmpty) {
            this.emitter.emit('message:push', { message: '請填寫二線改善項目！', status: 'danger' });
          } else {
            this.data.provide = [];
            this.data.ameliorate.forEach((item) => {
              this.data.provide.push({
                ameliorate: item.ameliorate,
                dueDate: item.dueDate,
                isDone: false,
                provide: '',
                file: [],
              });
            });
            this.sendSign();
          }
        }
      } else if (this.data.state === 'provide' && this.data.state_number === 1) {
        let isEmpty = false;
        this.data.provide.forEach((item) => {
          if (item.isDone === true && item.provide === '') {
            isEmpty = true;
          }
        });
        if (isEmpty) {
          this.emitter.emit('message:push', { message: '請填寫二線改善敘述！', status: 'danger' });
        } else {
          this.sendSign();
        }
      } else if (this.data.state_number !== 1) {
        this.sendSign();
      }
    },
    sendSign() {
      if (this.data.at_last === 'N') {
        this.data.currentState = this.data.state;
        this.data.state_number += 1;
        this.updateSendSign(this.data.action);
      }
      if (this.data.at_last === 'Y') {
        if (this.data.state === 'provide') {
          let isDone = true;
          this.data.provide.forEach((item) => {
            if (item.isDone === false) {
              isDone = false;
            }
          });
          if (isDone) {
            this.data.terminator = this.data.taker;
            this.data.currentState = this.data.state;
            this.data.state_number = 1;
            this.data.state = this.data.next;
            this.updateSendSign(this.data.action);
          } else {
            this.data.currentState = this.data.state;
            this.data.state_number = 1;
            this.data.state = 'provide';
            this.updateSendSign(this.data.action);
          }
        } else {
          this.data.currentState = this.data.state;
          this.data.state_number = 1;
          this.data.state = this.data.next;
          this.updateSendSign(this.data.action);
        }
      }
    },
    sendReject() {
      if (this.data.state === 'confirm' && this.data.state_number === 1) {
        this.data.currentState = this.data.state;
        this.data.state = this.data.previous;
        this.data.state_number = 1;
        this.updateSendSign('駁回');
      } else {
        this.data.currentState = this.data.state;
        this.data.state_number = 1;
        this.updateSendSign('駁回');
      }
    },
    updateSendSign(message) {
      this.data.message = message;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/send_sign`;
      this.$http
        .patch(api, this.data)
        .then((res) => {
          if (res.data.success) {
            this.historySearch();
            this.signHistory();
            this.emitter.emit('message:push', { message: `${message}成功！`, status: 'success' });
            this.isLoading = false;
            console.log('update send_sign success');
          } else {
            this.emitter.emit('message:push', { message: `${message}失敗！`, status: 'danger' });
            this.isLoading = false;
            console.log('update send_sign error');
          }
        })
        .catch((error) => {
          this.emitter.emit('message:push', { message: `${message}失敗！`, status: 'danger' });
          this.isLoading = false;
          console.log('update send_sign error');
          console.error(error);
        });
    },
    fileInput(source, index) {
      if (source === 'root_cause') {
        this.file = this.$refs.fileInputRootCause.files[0];
      } else if (source === 'ameliorate') {
        this.file = this.$refs[`fileInputAmeliorate${index}`][0].files[0];
      } else if (source === 'provide') {
        this.file = this.$refs[`fileInputProvide${index}`][0].files[0];
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
    uploadFile(source, index) {
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
            if (source === 'root_cause') {
              this.data.root_cause.file.push(response.data.file);
              this.$refs.fileInputRootCause.value = '';
            } else if (source === 'ameliorate') {
              this.data.ameliorate[index].file.push(response.data.file);
              this.$refs[`fileInputAmeliorate${index}`][0].value = '';
            } else if (source === 'provide') {
              this.data.provide[index].file.push(response.data.file);
              this.data.provide[index].isDone = true;
              this.$refs[`fileInputProvide${index}`][0].value = '';
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
    deleteFile(source, sourceIndex, item, index) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_CIM_ESERVICES_REPAIR_API_URL}/deleteFile`;
      this.$http.post(api, item)
        .then((response) => {
          if (response.data.success) {
            if (source === 'root_cause') {
              this.data.root_cause.file.splice(index, 1);
            } else if (source === 'ameliorate') {
              this.data.ameliorate[sourceIndex].file.splice(index, 1);
            } else if (source === 'provide') {
              this.data.provide[sourceIndex].file.splice(index, 1);
              if (this.data.provide[sourceIndex].file.length === 0) {
                this.data.provide[sourceIndex].isDone = false;
              }
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
    openModal() {
      this.boxModal.show();
    },
    openSignModal() {
      this.signModal.show();
    },
    openRejectModal() {
      this.rejectModal.show();
    },
    openCloseModal() {
      this.closeModal.show();
    },
    openSignHistoryModal() {
      this.signHistoryModal.show();
    },
  },
  created() {
    this.getEQPName();
    this.getUsers();
    this.getFirstData();
    this.getSecondData();
    this.getThirdData();
    this.historySearch();
    this.signHistory();
  },
  mounted() {
    this.signModal = new Modal(this.$refs.signModal);
    this.rejectModal = new Modal(this.$refs.rejectModal);
    this.closeModal = new Modal(this.$refs.closeModal);
    this.boxModal = new Modal(this.$refs.boxModal);
    this.signHistoryModal = new Modal(this.$refs.signHistoryModal);
    this.loginUser = localStorage.getItem('loginUser');
  },
};
</script>
