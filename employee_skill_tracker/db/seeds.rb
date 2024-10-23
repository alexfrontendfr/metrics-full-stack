require 'faker'

puts "Clearing existing data..."
Metric.destroy_all
TrainingSession.destroy_all
Skill.destroy_all
Employee.destroy_all
User.destroy_all

DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'Product', 'Support']
ROLES = {
  'Engineering' => ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'],
  'Sales' => ['Account Executive', 'Sales Representative', 'Sales Manager'],
  'Marketing' => ['Content Writer', 'SEO Specialist', 'Marketing Manager'],
  'Product' => ['Product Manager', 'Product Owner', 'UX Designer'],
  'Support' => ['Support Engineer', 'Customer Success', 'Technical Support']
}

SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
METRIC_NAMES = ['Performance', 'Productivity', 'Quality', 'Communication']

puts "Creating test users..."
3.times do |i|
  user = User.create!(
    email: "test#{i+1}@example.com",
    password: "password123",
    password_confirmation: "password123"
  )

  puts "Created user: #{user.email}"

  # Create employees for each user
  rand(3..5).times do
    department = DEPARTMENTS.sample
    role = ROLES[department].sample

    employee = user.employees.create!(
      name: Faker::Name.name,
      department: department,
      role: role,
      start_date: Faker::Date.between(from: 2.years.ago, to: Date.today)
    )

    puts "Created employee: #{employee.name}"

    # Create skills for each employee
    (3..5).to_a.sample.times do
      skill = employee.skills.create!(
        name: Faker::Job.key_skill,
        proficiency: rand(1..100)
      )

      puts "Created skill: #{skill.name}"

      # Create training sessions for each skill
      rand(1..3).times do
        training = employee.training_sessions.create!(
          name: "#{skill.name} Training",
          date: Faker::Date.between(from: 6.months.ago, to: Date.today),
          skill: skill
        )
        puts "Created training: #{training.name}"
      end
    end

    # Create metrics with gradual improvement
    10.times do |day|
      base_value = rand(60..95)
      improvement = day * 0.5
      variance = rand(-5..5)
      value = [base_value + improvement + variance, 100].min

      metric = user.metrics.create!(
        name: METRIC_NAMES.sample,
        value: value,
        level: case value
               when 0..40 then 'Beginner'
               when 41..60 then 'Intermediate'
               when 61..80 then 'Advanced'
               else 'Expert'
               end,
        evidence: Faker::Lorem.paragraph(sentence_count: 2),
        timestamp: day.days.ago,
        employee: employee
      )

      puts "Created metric: #{metric.name} (#{metric.value})"
    end
  end
end

puts "Seed data created successfully!"
puts "\nTest accounts:"
puts "test1@example.com / password123"
puts "test2@example.com / password123"
puts "test3@example.com / password123"