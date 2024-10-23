#!/usr/bin/env ruby

require 'fileutils'

class ConflictCleaner
  CONFLICT_PATTERN = /(<<<<<<<.*?\n)(.*?)(\=======\n)(.*?)(>>>>>>>.*?\n)/m
  BACKUP_SUFFIX = '.conflict_backup'
  
  def initialize(directory = '.')
    @directory = directory
    @processed_files = []
    @files_with_conflicts = []
  end

  def clean_conflicts
    puts "🔍 Scanning for files with Git conflict markers..."
    
    # Find all text-based files, excluding certain directories and files
    files = Dir.glob("#{@directory}/**/*").select do |file|
      File.file?(file) && 
      !file.end_with?(BACKUP_SUFFIX) &&
      !file.include?('/vendor/') &&
      !file.include?('/node_modules/') &&
      !file.include?('/tmp/') &&
      !file.include?('/.git/') &&
      !file.match?(/\.(jpg|jpeg|png|gif|svg|pdf|zip|tar|gz)$/)
    end

    files.each do |file|
      process_file(file)
    end

    print_summary
  end

  private

  def process_file(file)
    begin
      content = File.read(file)
      @processed_files << file
      
      if content.match?(CONFLICT_PATTERN)
        @files_with_conflicts << file
        backup_file(file, content)
        
        # Remove conflict markers and keep your changes (HEAD)
        new_content = content.gsub(CONFLICT_PATTERN) do |match|
          $2.strip + "\n" # Keep only the content between <<<<<<< and =======
        end
        
        File.write(file, new_content)
        puts "✅ Cleaned conflicts in: #{file}"
      end
    rescue => e
      puts "❌ Error processing #{file}: #{e.message}"
    end
  end

  def backup_file(file, content)
    backup_path = "#{file}#{BACKUP_SUFFIX}"
    FileUtils.cp(file, backup_path)
    puts "📑 Created backup: #{backup_path}"
  end

  def print_summary
    puts "\n📊 Summary:"
    puts "Files processed: #{@processed_files.size}"
    puts "Files with conflicts found: #{@files_with_conflicts.size}"
    
    if @files_with_conflicts.any?
      puts "\nFiles that had conflicts:"
      @files_with_conflicts.each { |file| puts "- #{file}" }
      puts "\nBackups were created with the suffix '#{BACKUP_SUFFIX}'"
    end
  end
end

# Run the cleaner
if __FILE__ == $0
  directory = ARGV[0] || '.'
  cleaner = ConflictCleaner.new(directory)
  cleaner.clean_conflicts
end
