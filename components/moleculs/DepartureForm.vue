<template>
  <form
    ref="edit-form"
    action="https://a5bffa7f-92dc-454e-bd7b-41377007474b.mock.pstmn.io/departures"
    method="post"
    class="edit-status"
    novalidate
    @submit.prevent="editStatusSubmit"
  >
    <fieldset class="edit-status__container">
      <legend class="edit-status__title">
        Update Statue
      </legend>

      <div class="edit-status__field">
        <label for="flight-code" class="edit-status__label">Flight code</label>
        <input
          id="flight-code"
          ref="flight-code"
          v-model="formData.flightCode"
          type="text"
          list="flight-codes"
          name="flight-code"
          aria-required="true"
          class="edit-status__input edit-status__input--code"
          placeholder="EI35"
          required
        />
        <datalist id="flight-codes">
          <template v-for="flight in flightData">
            <option :key="flight.flightNumber" :value="flight.flightNumber">
              {{ flight.flightNumber }}
            </option>
          </template>
        </datalist>
      </div>

      <div class="edit-status__field">
        <label for="flight-status" class="edit-status__label">
          <span>Update status</span>
          <span>Select from a pre existing status or input your own</span>
        </label>
        <input
          id="flight-status"
          ref="flight-status"
          v-model="formData.flightStatus"
          type="text"
          list="flight-statues"
          name="status"
          aria-required="true"
          class="edit-status__input edit-status__input--status"
          placeholder="Departed at 13:00"
          required
        />
        <datalist id="flight-statues">
          <option value="Departed">
            Departed
          </option>
          <option value="Diverted">
            Diverted
          </option>
          <option value="Delayed">
            Delayed
          </option>
          <option value="Cancelled">
            Cancelled
          </option>
        </datalist>
      </div>

      <p v-show="formMessage" class="edit-status__error" aria-live="assertive">
        {{ formMessage }}
      </p>

      <div class="edit-status__buttons">
        <button type="button" class="edit-status__button edit-status__button--refresh" @click="getData">
          Refresh flight list
        </button>
        <button type="submit" class="edit-status__button edit-status__button--submit">
          <span v-show="processing">
            Processing
          </span>
          <span v-show="!processing">
            Update flight
          </span>
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script>
// Services
import getDepartures from '@/services/api-calls/departures';
import updateStatus from '@/services/api-calls/updateStatus';

export default {
  name: 'DepartureForm',

  data () {
    return {
      flightData: [],
      formData: {
        flightCode: '',
        flightStatus: ''
      },
      formMessage: '',
      processing: false
    };
  },

  mounted () {
    this.getData();
  },

  methods: {

    /**
     * Make a call to get the lasted flight departure times
     * @returns {Promise<void>}
     */
    async getData () {
      this.flightData = await getDepartures();
    },

    /**
     * Check if the form is valid by checking if the fields have a value
     * @param {SubmitEvent} event - The form submit event
     */
    editStatusSubmit (event) {
      /** @type {HTMLFormElement} */
      const { target } = event;
      const codeElm = this.$refs['flight-code'];
      const statusElm = this.$refs['flight-status'];

      if (!target.checkValidity()) {
        if (codeElm.validity.valueMissing) {
          codeElm.setCustomValidity('Flight code needed');
          codeElm.reportValidity();
        }

        if (statusElm.validity.valueMissing) {
          statusElm.setCustomValidity('What\'s the new status?');
          statusElm.reportValidity();
        }
      } else if (!this.processing) {
        // Only send a new request if we are not wait for one to complete
        this.sendUpdate();
      }
    },

    sendUpdate () {
      const form = this.$refs['edit-form'];
      this.processing = true;

      performance.mark('update-status-start');
      updateStatus(this.flightData)
        .then(() => {
          performance.mark('update-status-end');
          form.reset();
          this.formMessage = '';
        })
        .catch((e) => {
          this.formMessage = e.message;
        })
        .then(() => {
          this.processing = false;
        });

      performance.measure('update-status', 'update-status-start', 'departure-call-end');
    }
  }
};
</script>

<style>
  .edit-status {
    margin: 0 auto;
    max-width: 500px;
    padding: 0 0 2rem;
  }

  .edit-status__container {
    border: none;
  }

  .edit-status__title {
    font-weight: bold;
  }

  .edit-status__field {
    background: linear-gradient(90deg, #fff 0%, #aebcca 100%);
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
  }

  .edit-status__field:focus-within {
    box-shadow: inset 0 0 2px 1px #7f7f7f;
  }

  .edit-status__label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin-bottom: 0.5rem;
  }

  .edit-status__input {
    border: none;
    border-bottom: 2px solid grey;
    border-radius: 5px;
    display: inline-block;
    outline: none;
    padding: 0.25rem 0.5rem;
  }

  .edit-status__input--code {
    width: 7rem;
  }

  .edit-status__input--status {
    width: 15rem;
  }

  .edit-status__buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .edit-status__button {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }

  .edit-status__button--refresh {
    background: transparent;
    border: 1px solid var(--flight-go-to-gate);
    color: var(--flight-go-to-gate);
  }

  .edit-status__button--submit {
    background: var(--flight-go-to-gate);
    color: white;
  }

  .edit-status__error {
    color: var(--error);
    border: 3px solid var(--error);
    font-size: 1.2rem;
    padding: 1.5rem 1rem;
    text-align: center;
  }
</style>
