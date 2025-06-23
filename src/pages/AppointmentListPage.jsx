import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../redux/appointmentsSlice';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import it from 'date-fns/locale/it';
import { format } from 'date-fns';
import Toast from '../components/Toast';
import Spinner from '../components/Spinner';

registerLocale('it', it);

const hours = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

function AppointmentListPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.appointments);

  const [formData, setFormData] = useState({
    customer: '',
    time: '',
    service: '',
    status: 'pending',
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const isSlotOccupied = (date, time) => {
    const dateStr = date ? format(date, 'yyyy-MM-dd') : '';
    return list.some((appt) => appt.date === dateStr && appt.time === time);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

    console.log('DEBUG submit:', {
      dateStr,
      time: formData.time,
      customer: formData.customer,
      service: formData.service
    });

    if (!dateStr || !formData.time || !formData.customer || !formData.service) {
      alert('Completa tutti i campi!');
      return;
    }

    if (isSlotOccupied(selectedDate, formData.time)) {
      alert('Questo slot è già occupato!');
      return;
    }

    const newAppointment = {
      ...formData,
      date: dateStr,
    };

    try {
      setIsSubmitting(true);
      await axios.post('http://localhost:3001/appointments', newAppointment);
      setSuccessMessage('Prenotazione aggiunta con successo!');
      dispatch(fetchAppointments());
      setFormData({
        customer: '',
        time: '',
        service: '',
        status: 'pending',
      });
      setSelectedDate(null);
      setTimeout(() => setSuccessMessage(''), 10000);
    } catch (error) {
      console.error('Errore POST:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <Toast message={successMessage} />

      <h1 className="text-3xl font-bold mb-6">Prenota un appuntamento</h1>

      {loading && <Spinner />}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 border p-4 rounded shadow">
        <input
          type="text"
          name="customer"
          placeholder="Tuo nome"
          value={formData.customer}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <div>
          <label className="block mb-1 font-semibold">Data</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            locale="it"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            className="border p-2 w-full rounded"
            placeholderText="Seleziona una data"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Orario</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Seleziona orario</option>
            {hours.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="service"
          placeholder="Servizio (es. Taglio, Colore)"
          value={formData.service}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
          } text-white px-4 py-2 rounded w-full`}
        >
          {isSubmitting ? 'Invio...' : 'Prenota'}
        </button>
      </form>

      {selectedDate && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">
              {selectedDate.toLocaleDateString('it-IT')}
            </h2>
            <div className="flex flex-col space-y-2">
              {hours.map((time) => (
                <button
                  key={time}
                  className={`p-2 rounded ${
                    isSlotOccupied(selectedDate, time)
                      ? 'bg-red-400 cursor-not-allowed'
                      : 'bg-green-400 hover:bg-green-500'
                  }`}
                  disabled={isSlotOccupied(selectedDate, time)}
                >
                  {time} — {isSlotOccupied(selectedDate, time) ? 'Occupato' : 'Disponibile'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentListPage;
