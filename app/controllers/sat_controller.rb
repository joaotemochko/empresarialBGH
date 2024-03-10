class SatController < DefaultController
  extend FFI::Library, Prototype::_Prototype
  require_relative 'lib_ruby/biblioteca_sat'
  require_relative 'lib_ruby/sat_info_constantes'
  require 'ffi'

  ffi_lib FFI::Library::LIBC
  def index
    Biblioteca_sat.init('C:/SAT/SAT.dll')
  end
  private


end