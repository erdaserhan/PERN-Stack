import { useNavigate, useParams } from "react-router-dom"
import { useProductStore } from "../store/useProductStore"
import { useEffect } from "react"

function ProductPage() {
  const { 
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct
   } = useProductStore()
   const navigate = useNavigate()
   const {id} = useParams()

   useEffect(() => {
      fetchProduct(id)
    }, [fetchProduct, id])

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loading loading-spinner loading-lg"/>
        </div>
      )
    }

    if (error) {  
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error">{error}</div>
        </div>
      );
    }
    
  return (
    <div>ProductPage</div>
  )
}

export default ProductPage