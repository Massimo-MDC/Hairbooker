import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../redux/appointmentsSlice';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import it from 'date-fns/locale/it';
import { format } from 'date-fns';
import Spinner from '../components/Spinner';

registerLocale('it', it);

function AdminDashboard() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.appointments);

  const [filterDate, setFilterDate] = useState(null);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Sei sicuro di voler cancellare questo appuntamento?')) {
      try {
        await axios.delete(`http://localhost:3001/appointments/${id}`);
        dispatch(fetchAppointments());
      } catch (error) {
        console.error('Errore DELETE:', error);
      }
    }
  };

  const handleConfirm = async (appt) => {
    try {
      await axios.patch(`http://localhost:3001/appointments/${appt.id}`, {
        status: appt.status === 'pending' ? 'confirmed' : 'pending',
      });
      dispatch(fetchAppointments());
    } catch (error) {
      console.error('Errore PATCH:', error);
    }
  };

  const filteredAppointments = filterDate
    ? list.filter((appt) => appt.date === format(filterDate, 'yyyy-MM-dd'))
    : list;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestione Appuntamenti (Admin)</h1>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
        <label className="font-semibold">Filtra per data:</label>
        <DatePicker
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          locale="it"
          dateFormat="yyyy-MM-dd"
          className="border p-2 rounded w-60"
          placeholderText="Seleziona una data"
          isClearable
        />
      </div>

      {loading && <Spinner />}

      {error && <p className="text-red-500">Errore: {error}</p>}

      {filteredAppointments.length === 0 && (
        <p className="text-gray-600">Nessun appuntamento trovato.</p>
      )}

      {filteredAppointments.map((appt) => (
        <div key={appt.id} className="border p-4 mb-2 rounded shadow">
          <p><strong>Cliente:</strong> {appt.customer}</p>
          <p><strong>Data:</strong> {appt.date}</p>
          <p><strong>Ora:</strong> {appt.time}</p>
          <p><strong>Servizio:</strong> {appt.service}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={`font-bold ${
                appt.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
              }`}
            >
              {appt.status}
            </span>
          </p>

          <div className="flex space-x-2 mt-3">
            <button
              onClick={() => handleConfirm(appt)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              {appt.status === 'pending' ? 'Conferma' : 'Annulla Conferma'}
            </button>

            <button
              onClick={() => handleDelete(appt.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Cancella
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
