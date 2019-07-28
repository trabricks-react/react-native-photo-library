
Pod::Spec.new do |s|
  s.name         = "RNPhotoLibrary"
  s.version      = "1.0.0"
  s.summary      = "RNPhotoLibrary"
  s.description  = <<-DESC
                  RNPhotoLibrary
                   DESC
  s.homepage     = "https://github.com/retizen/react-native-photo-library"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNPhotoLibrary.git", :tag => "master" }
  s.source_files  = "RNPhotoLibrary/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

