#!/usr/bin/env ruby
# Patch generated Xcode targets with explicit manual signing values.
#
# usage:
#   patch-ios-signing.rb <project.xcodeproj> <team_id> <code_sign_identity> \
#     <target>=<profile> [<target>=<profile> ...]

require "xcodeproj"

if ARGV.length < 4
  warn "usage: patch-ios-signing.rb <project.xcodeproj> <team_id> <code_sign_identity> <target>=<profile> [<target>=<profile> ...]"
  exit 2
end

xcodeproj_path, team_id, code_sign_identity, *target_profile_args = ARGV

target_profiles = {}
target_profile_args.each do |arg|
  target_name, profile = arg.split("=", 2)
  if target_name.to_s.empty? || profile.to_s.empty?
    warn "::error::Invalid target/profile mapping '#{arg}'. Expected <target>=<profile>."
    exit 1
  end
  target_profiles[target_name] = profile
end

project = Xcodeproj::Project.open(xcodeproj_path)

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
