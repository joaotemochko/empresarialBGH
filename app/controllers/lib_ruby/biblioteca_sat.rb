module Biblioteca_sat
  require_relative 'sat_info_constantes'
  extend Prototype::_Prototype

  def self.biblioteca_sat(object)
    def self.init(caminho)
      @_libsat = nil
      @_caminho = caminho
      self.carregar
    end

    def self.carregar
      @_libsat = FFI::DynamicLibrary.open(@_caminho, 0)
    end

    @property
    def self.ref
      return @libsat
    end
    @property
    def self.caminho
      return @caminho
    end
  end
end

module Prototype
  def self._Prototype(object)
    __slots__ = %w('argtypes', 'restype')
    def self.__init__(argtypes, restype = ffi_lib(:char_p))
      @argtypes = argtypes
      @restype = restype
      @restype = restype

      @FUNCTION_PROTOTYPES = hash{
        @AtivarSAT=_Prototype(ffi_lib([:int, :int, :char_p, :char_p, :int])),
          @ComunicarCertificadoICPBRASIL=_Prototype(ffi_lib([:int, :char_p, :char_p])),
          @EnviarDadosVenda=_Prototype(ffi_lib([:int, :char_p, :char_p])),
          @CancelarUltimaVenda=_Prototype(ffi_lib([:int, :char_p, :char_p, :char_p])),
          @ConsultarSAT=_Prototype(attach_function([:int])),
          @TesteFimAFim=_Prototype(attach_function([:int, :char_p, :char_p])),
          @ConsultarStatusOperacional=_Prototype(attach_funcion([:int, :char_p])),
          @ConsultarNumeroSessao=_Prototype(attach_function[:int, :char_p, :int]),
          @ConfigurarInterfaceDeRede=_Prototype(attach_function[:int, :char_p, :char_p]),
          @AssociarAssinatura=_Prototype(attach_function[:int, :char_p, :char_p, :char_p]),
          @AtualizarSoftwareSAT=_Prototype(attach_function[:int, :char_p]),
          @ExtrairLogs=_Prototype(attach_function[:int, :char_p]),
          @BloquearSAT=_Prototype(attach_function[:int, :char_p]),
          @DesbloquearSAT=_Prototype(attach_function[:int, :char_p]),
          @TrocarCodigoDeAtivacao=_Prototype(attach_function[
                                               :int,
                                               :char_p,
                                               :int,
                                               :char_p,
                                               :char_p]),
          @ConsultarUltimaSessaoFiscal=_Prototype(attach_function[:int, :char_p])
      }
    end
  end
end