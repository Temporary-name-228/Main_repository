const SUPABASE_URL = 'https://vfmcpucwzrlvuvgpligd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbWNwdWN3enJsdnV2Z3BsaWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjgxOTYsImV4cCI6MjA4OTg0NDE5Nn0.kDzOSFmAUYnAM7ATlgG6bvbvbR87noOeWOvA19je_7Y';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Собираем данные из полей формы (используем атрибуты 'name' из твоего HTML)
    const formData = new FormData(feedbackForm);
    const personName = formData.get('name');
    const personEmail = formData.get('email');
    const personPhone = formData.get('phone');
    const selectedEvent = formData.get('event'); // Значение из <select>

    try {
        // ШАГ 1: Добавляем запись в таблицу 'people'
        // Важно: используем маленькие буквы в названии таблицы, как в твоей БД
        const { data: person, error: personError } = await supabaseClient
            .from('people')
            .insert([{ 
                name: personName, 
                email: personEmail, 
                phone: personPhone 
            }])
            .select()
            .single();

        if (personError) throw personError;

        // ШАГ 2: Находим ID мероприятия в таблице 'event' по названию
        const { data: eventData, error: eventError } = await supabaseClient
            .from('event')
            .select('event_id')
            .eq('event_name', selectedEvent)
            .single();

        // ШАГ 3: Если мероприятие найдено, создаем связь в 'people_events'
        if (eventData && person) {
            const { error: linkError } = await supabaseClient
                .from('people_events')
                .insert([{
                    id_person: person.id,
                    id_event: eventData.event_id
                }]);
            
            if (linkError) throw linkError;
        }

        alert('Поздравляем! Вы успешно записались на мероприятие.');
        feedbackForm.reset(); // Очищаем форму после успеха

    } catch (error) {
        // Выводим подробную ошибку в консоль для отладки
        console.error('Детали ошибки:', error);
        alert('Произошла ошибка при отправке: ' + error.message);
    }
});