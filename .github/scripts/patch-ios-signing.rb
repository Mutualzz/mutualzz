#!/usr/bin/env ruby
# Patch generated Xcode targets with explicit manual signing values.

require "xcodeproj"

if ARGV.length != 7
  warn "usage: patch-ios-signing.rb <project.xcodeproj> <team_id> <main_profile> <extension_profile> <code_sign_identity> <main_target> <extension_target>"
  exit 2
end

xcodeproj_path, team_id, main_profile, extension_profile, code_sign_identity, main_target, extension_target = ARGV

project = Xcodeproj::Project.open(xcodeproj_path)

target_profiles = {
  main_target => main_profile,
  extension_target => extension_profile,
}

patched_counts = Hash[target_profiles.keys.map { |name| [name, 0] }]

target_profiles.each do |target_name, profile|
  target = project.targets.find { |candidate| candidate.name == target_name }
  unless target
    warn "::error::Target '#{target_name}' not found in #{xcodeproj_path}"
    warn "Available targets: #{project.targets.map(&:name).join(', ')}"
    exit 1
  end

  target.build_configurations.each do |config|
    settings = config.build_settings
    settings["CODE_SIGN_STYLE"] = "Manual"
    settings["DEVELOPMENT_TEAM"] = team_id
    settings["CODE_SIGN_IDENTITY"] = code_sign_identity
    settings["PROVISIONING_PROFILE_SPECIFIER"] = profile
    patched_counts[target_name] += 1
  end
end

project.save

missing = patched_counts.select { |_name, count| count.zero? }.keys
unless missing.empty?
  warn "::error::Failed to patch signing settings for targets: #{missing.join(', ')}"
  exit 1
end

warn "Patched Xcode signing configs:"
patched_counts.each do |target_name, count|
  warn "  #{target_name}: #{count} configuration(s)"
end
