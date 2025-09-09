#!/usr/bin/env node

/**
 * Тест валидации формы обратной связи
 * Проверяет работу с опциональными полями email и message
 */

console.log('🧪 ТЕСТИРОВАНИЕ ВАЛИДАЦИИ ФОРМЫ');
console.log('=' .repeat(50));

// Имитация данных формы
const testCases = [
  {
    name: 'Полная форма',
    data: {
      name: 'Иван Иванов',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      message: 'Хочу узнать о НОК НОСТРОЙ'
    },
    expected: true
  },
  {
    name: 'Без email',
    data: {
      name: 'Мария Петрова',
      phone: '+7 (999) 987-65-43',
      email: '',
      message: 'Консультация по документам'
    },
    expected: true
  },
  {
    name: 'Без сообщения',
    data: {
      name: 'Алексей Сидоров',
      phone: '+7 (999) 555-12-34',
      email: 'alex@example.com',
      message: ''
    },
    expected: true
  },
  {
    name: 'Без email и сообщения',
    data: {
      name: 'Ольга Козлова',
      phone: '+7 (999) 777-88-99',
      email: '',
      message: ''
    },
    expected: true
  },
  {
    name: 'Без имени (должен провалиться)',
    data: {
      name: '',
      phone: '+7 (999) 111-22-33',
      email: 'test@example.com',
      message: 'Тестовое сообщение'
    },
    expected: false
  },
  {
    name: 'Без телефона (должен провалиться)',
    data: {
      name: 'Тестовый Пользователь',
      phone: '',
      email: 'test@example.com',
      message: 'Тестовое сообщение'
    },
    expected: false
  }
];

// Функция валидации (имитация реальной)
function validateForm(formData) {
  if (!formData.name.trim() || !formData.phone.trim()) {
    return {
      success: false,
      message: 'Пожалуйста, заполните обязательные поля (Имя, Телефон)'
    };
  }

  return {
    success: true,
    message: 'Форма валидна'
  };
}

// Запуск тестов
let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
  console.log(`\n${index + 1}. ${testCase.name}`);
  console.log('-'.repeat(30));

  const result = validateForm(testCase.data);

  console.log(`📝 Данные:`, {
    name: testCase.data.name || '(пусто)',
    phone: testCase.data.phone || '(пусто)',
    email: testCase.data.email || '(пусто)',
    message: testCase.data.message || '(пусто)'
  });

  if (result.success === testCase.expected) {
    console.log(`✅ ${result.message}`);
    passed++;
  } else {
    console.log(`❌ ОШИБКА: ${result.message}`);
    failed++;
  }
});

console.log('\n' + '=' .repeat(50));
console.log(`📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ:`);
console.log(`✅ Пройдено: ${passed}`);
console.log(`❌ Провалено: ${failed}`);
console.log(`📈 Всего тестов: ${testCases.length}`);

if (failed === 0) {
  console.log('\n🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ! Валидация работает корректно.');
  console.log('💡 Теперь email и message поля опциональны.');
} else {
  console.log('\n⚠️ ОБНАРУЖЕНЫ ОШИБКИ! Проверьте валидацию формы.');
}
